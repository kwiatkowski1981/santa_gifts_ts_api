const {createPool} = require("mysql2/promise");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'MariaDB1981@',
    database: 'megak_santa_gifts',
    decimalNumbers: true,
    namedPlaceholders: true,
});

module.exports = {
    pool,
}