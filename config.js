const DB_USERNAME = 'dohungcuongdev';
const DB_PW = 'ititiu13170';
const DB_MLAB_HOST = 'ds255577.mlab.com:55577';
const DB_NAME = 'mern-spa';
const DB_MLAB = `mongodb://${DB_USERNAME}:${DB_PW}@${DB_MLAB_HOST}/${DB_NAME}`;
const DB_LOCALHOST = `mongodb://localhost/${DB_NAME}`;

const DB = (process.env.NODE_ENV !== 'production') ? DB_LOCALHOST : DB_MLAB;

const RULES_BASE_CONFIG = {
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "rules": {}
}

module.exports = { DB, RULES_BASE_CONFIG }