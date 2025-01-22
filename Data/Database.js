const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host:"junction.proxy.rlwy.net",
    database:"railway",
    user:'root',
    password:"",
    port:13682
})


module.exports = db