const errHandler = require('./errHandler');
const ruleModel = require('./models/rule');
const { RULES_BASE_CONFIG } = require('./config');
const { initRules } = require('./initData');
const fs = require('fs');

exports.run = async function () {
    await initRules();
    await writeRules();
    process.exit(0);
}

const writeRules = async () => {
    try {
        const JSON_FILE_DIR = (process.env.NODE_ENV === 'production') ? `${proglang}_${customer}_${project}.json` : `json/${customer}_${project}_${proglang}.json`;
        console.log(`Begin read activated rules in DB and write JSON file: ${JSON_FILE_DIR}`);
        let rulesConfiguration;
        switch(proglang) {
            case "javascript": rulesConfiguration = await rulesConfigJS(); break;
            case "java": rulesConfiguration = await rulesConfigJava(); break;
            case "php": rulesConfiguration = await rulesConfigPHP(); break;
            case "python": rulesConfiguration = await rulesConfigPython(); break;
        }
        await fs.writeFileSync(JSON_FILE_DIR, JSON.stringify(rulesConfiguration));
        console.log(`${JSON_FILE_DIR} is written successfully`, rulesConfiguration);
    } catch (writeErr) {
        errHandler.handle(writeErr);
    }
}

const rulesConfigJS = async () => {
    const rules = await ruleModel.find({ customer, project, proglang, activated: true });
    const data = Object.assign(RULES_BASE_CONFIG);
    let l = rules.length;
    for (let i = 0; i < l; i++) {
        let rule = rules[i];
        data.rules[rule.name.split('.')[2]] = rule.config;
    }
    return data;
};

const rulesConfigJava = async () => {
    throw new Error('have not supported yet');
};

const rulesConfigPHP = async () => {
    throw new Error('have not supported yet');
};

const rulesConfigPython = async () => {
    throw new Error('have not supported yet');
};