const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "password",
    host: "127.0.0.1",
    port: 5432,
    database: "TeleMed"
})

client.connect()
.then(() => console.log("Connected Succesfully"))
.catch(error => console.log('e', error))

client.query('SELECT * from admins', (err, res) => {
    console.log(res.rows);
  })