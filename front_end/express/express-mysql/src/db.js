const mysql = require('mysql')

const config = require('./config').db

module.exports = mysql.createConnection(config)