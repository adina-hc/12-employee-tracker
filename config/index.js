const util = require('util');
const mysql = require('mysql');

const dbConnect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'D4t1t0s-2021',
    database: 'employees_db',

});

dbConnect.connect((err) => {
  if (err) throw err;
  console.log(`connected to port 3306`)
  
});

module.exports = dbConnect;