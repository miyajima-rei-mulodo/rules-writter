const fs = require('fs');

const isNotNull = o => typeof o !== 'undefined' && o != null;

const isArray = a => {
    return a && Array.isArray(a) && a.length > 0;
}

const isStringNotBlank = s => {
    return s && typeof s === 'string' && s !== '';
}

const areStringsNotBlank = (...s) => {
    if (!isArray(s)) return false;
    for (let i = 0; i < s.length; i++) {
        if (!isStringNotBlank(s[i])) {
            return false;
        }
    }
    return true;
}

function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function checkCmdParams(cmdParams) {
    for (let i = 2; i <= 4; i++) {
        if (!isStringNotBlank(cmdParams[i])) {
            return false;
        }
    }
    return true;
}

module.exports = { isNotNull, isArray, isStringNotBlank, areStringsNotBlank, readFileAsync, checkCmdParams }