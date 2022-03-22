const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'francesca.robertson',
  password: 'password',
  port: 5432,
});

client.connect(function (err) {
  if (err) {
    throw err;
  }
});

module.exports = client;
