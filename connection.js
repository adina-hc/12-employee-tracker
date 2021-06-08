// Require mysql
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'',
    database: 'employees_db',

});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected`)
  runSearch();
});

const readEmployees = () => {
    connection.query('')
}