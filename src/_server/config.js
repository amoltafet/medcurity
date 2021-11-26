const mysql = require('mysql2')

const db = mysql.createConnection({
host: "gamemekanics.com",
user: "testing",
password: "testingsql123",
database: "hipaagames" 
})

module.exports = db;