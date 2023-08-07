const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "tienda",
  host: "127.0.0.1",
  database: "tienda",
  password: "V1ct0r#$%%",
  port: 5432,
});
module.exports = pool;