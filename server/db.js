const keys = require('./keys');

const Pool = require('pg').Pool

const pool = new Pool({
    user: keys.pgUser,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
    host: keys.pgHost,
})

module.exports = pool;