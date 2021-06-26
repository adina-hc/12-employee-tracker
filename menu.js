const inquirer = require("inquirer");
const { createConnection } = require("mysql");

const queryObj = require("./queries")

// Inquirer to see what the user wants to do

const menuSelection = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "menuChoice",
    choices: [
      "View all Employees",
      "View all Departments",
      "View all Roles",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Remove Department",
      "Remove Role",
      "Remove Employee",
      "Update Department",
      "Update Role",
      "View all Employees by Manager",
      "Update Employee Manager",
      "Exit App",
    ],
    // Validate user entry
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "You must enter a valid selection";
      }
    },
  },
];

// Compare answers to run respective functions
function compare (answers){
    switch (answers.menuChoice) {
      case "View all Employees":
        queryObj.viewAllEmp();
        displayMenu();
        break;
      case "View all Departments":
        queryObj.viewAllDep();
        displayMenu();
        break;
      case "View all Roles":
        queryObj.viewAllRol();
        displayMenu();
        break;
      case "View all Employees by Manager":
        queryObj.viewAllEmpByMgr();
        break;
      case "Add Employee":
        queryObj.addEmp();
        break;
      case "Add Role":
        queryObj.addRole();
        break;
      case "Add Department":
        queryObj.addDep();
        displayMenu();
        break;
      case "Remove Employee":
        queryObj.removeEmp();
        break;
      case "Remove Role":
        queryObj.removeRole();
        break;
      case "Remove Department":
        queryObj.removeDep();
        break;
      case "Update Employee Role":
        updateEmpRole();
        break;
      case "Update Employee Manager":
        updateEmpMgr();
        break;
      case "Exit App":
        createConnection.end();
        break;
      default:
        console.log(`Invalid selection: ${answers.menuChoice}`);
    }
};


// Inquirer to see what the user wants to do
const displayMenu = () => {  
    inquirer.prompt(menuSelection)
    // compare answers to trigger functions
    .then(responseObj => {
        console.log(responseObj)
        compare(responseObj)
    });
};

// selectMenu call to initialize app
module.exports = displayMenu;

