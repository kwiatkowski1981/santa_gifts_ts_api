import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'MariaDB1981@',
    database: 'megak_santa_gifts',
    decimalNumbers: true,
    namedPlaceholders: true,
});
