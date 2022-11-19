const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
const db = async () => {

    await client.connect()
    client.query("",(err, res) => {
        if (err) console.log(err);
        else {
            console.log("Connected To Database Successfully");
        }
        client.end();
    })
}
module.exports = db;