require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
    
        await client.query(`
            CREATE TABLE professions (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL
            );  

            CREATE TABLE dannys (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                profession_id INTEGER NOT NULL REFERENCES professions(id),
                age INTEGER NOT NULL,
                has_dignity BOOLEAN NOT NULL,
                power_level INTEGER NOT NULL
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}