"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;
let client;
console.log(ENV);
console.log('host:', POSTGRES_HOST);
console.log('user', POSTGRES_USER);
console.log('password', POSTGRES_PASSWORD);
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    }
    else {
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('query error', err.stack);
            }
            else {
                console.log('connected successfully', res.rows[0]);
            }
            client.end();
        });
    }
});
exports.default = client;
