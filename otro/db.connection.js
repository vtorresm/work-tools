const pgp = require('pg-promise')();
const db = pgp({
  connectionString: 'postgres://postgres:root@localhost:5432/postgres'
});

module.exports = db;
