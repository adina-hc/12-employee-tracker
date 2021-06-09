const inquirer = require("inquirer");

// Display in terminal
// const table = cTable.getTable([
//     {
//         employees}]);



// Inquirer to see what the user wants to do

const menuSelection = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuChoice',
        choices: ['View all Employees',
            'View all Employees by Department',
            'View all Employees by Manager',
            'Add an Employee',
            'Remove Employee',
            'Update Employee',
            'Update Employee Role',
            'Update Employee Manager'],
        // Validate user entry
        validate: (value) => {
            if(value) {
                return true;
            }
            else {
                return 'You must enter a valid selection';
            }
        }
    },
];

// Inquirer to see what the user wants to do
function selectMenu(){  
    inquirer.prompt(menuSelection)
    .then(function(answers){
    console.log(answers);
    });
};

// selectMenu call to initialize app
selectMenu();


// Compare answers to run respective functions



