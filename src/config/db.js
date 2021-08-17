const { pool } = require("pg")

module.exports = new pool({
    user: '',
    password: "",
    host: "localhost",
    port: 343,
    database: "launchstoredb"
})