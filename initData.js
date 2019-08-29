const errHandler = require('./errHandler');
const ruleModel = require('./models/rule');
const { isArray, readFileAsync } = require('./helper');

const initRules = async function () {
    try {
        if (process.env.INITIALIZE === 'done') return;
        const JSON_FILE_DIR = (process.env.NODE_ENV === 'production') ? 'init-rules.json' : 'json/init-rules.json';
        console.log(`Begin Read JSON file: ${JSON_FILE_DIR} (if availabe) and update DB`);
        const data = await readFileAsync(JSON_FILE_DIR);
        console.log(`Read JSON file: ${JSON_FILE_DIR} successfully`);
        await handleUpdateRules(JSON.parse(data));
    } catch (readFileErr) {
        console.log(`JSON file: ${JSON_FILE_DIR} not found: skip initialize rules`)
    }
}

const handleUpdateRules = async rules => {
    try {
        if (isArray(rules)) {
            await updateRules(rules);
            console.log(`Rules updated successfull into DB`);
        } else {
            errHandler.handle({ error: 'rules must be an array' });
        }
    } catch (updateErr) {
        errHandler.handle(updateErr);
    }
}

const updateRules = async rules => {
    let l = rules.length;
    for (let i = 0; i < l; i++) {
        let rule = rules[i];
        await ruleModel.insertOrUpdate(rule.customer, rule.project, rule.proglang, rule.name, rule.des, rule.config, rule.activated);
        console.log(`Rules_index=${i + 1}. Done process one document into collection rule ...`);
    }
}

module.exports = { initRules }