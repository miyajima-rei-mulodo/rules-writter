const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const { isNotNull, areStringsNotBlank } = require('../helper');

mongoose.Promise = global.Promise;

const ruleSchema = new Schema(
    {
        customer: { type: String, required: true },
        project: { type: String, required: true },
        proglang: { type: String, required: true },
        name: { type: String, required: true },
        des: { type: String, required: true },
        config: { type: Mixed, required: true },
        activated: { type: Boolean, required: true },
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'rule'
    }
);

const ruleModel = module.exports = mongoose.model('rule', ruleSchema);

module.exports.insertOrUpdate = async function (customer, project, proglang, name, des, config, activated) {
    if (areStringsNotBlank(customer, project, proglang, name, des) && isNotNull(config) && typeof activated === "boolean") {
        await ruleModel.findOne({ customer, project, proglang, name }).then(async rule => {
            if (!rule) {
                const newRule = new ruleModel({ customer, project, proglang, name, des, config, activated });
                console.log(`customer=${customer} project=${project} proglang=${proglang} rule=${name} not found -> insert`);
                await newRule.save();
            } else {
                console.log(`customer=${customer} project=${project} proglang=${proglang} rule=${name} found -> update`);
                await ruleModel.updateOne({ name }, { des, config, activated });
            }
        })
    } else {
        console.log(`customer, project, proglang, name, des must be string and must not be blank; config must not be null; activated must be boolean: true or false`);
    }
};