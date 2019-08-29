require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const executioner = require('./executioner');
const { checkCmdParams } = require('./helper');
const errHandler = require('./errHandler');
const { DB } = require('./config');
console.log(DB);

const app = express();

const cmdParams = process.argv;
if (!checkCmdParams(cmdParams)) {
    errHandler.handle('Missing cmd parameters: please input like this: node index.js [project] [sourceprovider] [repoURL] [branch] [region] [buildid]', 'Read cmd parameters')
}
global.customer = cmdParams[2];
global.project = cmdParams[3];
global.proglang = cmdParams[4];

connectDB();

function connectDB() {
    mongoose.connection
        .on('error', console.log)
        .once('open', listen);
    return mongoose.connect(DB, { keepAlive: 1, useNewUrlParser: true });
}

function listen() {
    if (app.get('env') === 'test') return;
    console.log('DB connected successfully');
    executioner.run();
}