// Require mysql
const mysql = require('mysql');
const inquirer = require('inquirer');


// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    

});

const readEmployees = () => {
    connection.query('')
}