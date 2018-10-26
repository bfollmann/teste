const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

const createTableU = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
      )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}


const createTableP = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
      posts(
        id_post UUID,
        text VARCHAR(1024) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        id_user INTEGER REFERENCES users(id),
        PRIMARY KEY (id_post, id_user)
      )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropTableU = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropTableP = () => {
    const queryText = 'DROP TABLE IF EXISTS posts';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTableU,
    createTableP,
    dropTableU,
    dropTableP
};

require('make-runnable');