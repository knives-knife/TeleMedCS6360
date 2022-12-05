const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "password",
    host: "127.0.0.1",
    port: 5432,
    database: "TeleMed"
})
  module.exports = client