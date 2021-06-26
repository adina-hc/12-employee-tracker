const dbConnect = require('./config');
const inquirer = require('inquirer');
const { listenerCount } = require('./config');

const displayMenu = require('./menu');

// Query to view all employees
const queryObj = {
  // Displays all employees
  viewAllEmp: () => {
    let sql = `SELECT employees.id,employees.first_name,employees.last_name,roles.title,departments.department_name AS 'department', roles.salary
        FROM employees, roles, departments WHERE departments.id = roles.department_id
        AND roles.id = employees.role_id
        ORDER BY employees.id`;
    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("*************");
      console.log("\n");
    });
  },

  //Displays all departments
  viewAllDep: () => {
    let sql = `
        SELECT id, department_name AS 'department'
        FROM departments`;
    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("*************");
      console.log("\n");
    });
  },
  
  // Displays all roles
  viewAllRol: () => {
    let sql = `
        SELECT id, title, salary AS 'role'
        FROM roles`;
    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("*************");
      console.log("\n");
    });
  },

  // Bonus exercise
  viewAllEmpByMgr: () => {
    let sql = `
    SELECT IFNULL(mgrID, 'None') AS finalResult from (SELECT concat(Mgr_ID,' ', manager) as mgrID FROM(SELECT  employees.id, employees.first_name, employees.last_name, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager, mgr.id AS Mgr_ID FROM employees LEFT OUTER JOIN employees mgr ON employees.manager_id = mgr.id INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON departments.id = roles.department_id ORDER by employees.id) AS manager LEFT OUTER JOIN employees r ON manager.Mgr_ID = r.id) as mgridfinal`;

    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            name: "mgrChoice",
            choices() {
              return res.map((selection) => selection.finalResult);
            },
            message: "Select Manager",
          },
        ])
        .then((answer) => {
          console.log(answer);
          let mgrName = parseInt(
            answer.mgrChoice.slice(0, answer.mgrChoice.indexOf(" "))
          );
          console.log(mgrName);
          let sql2 = `
          SELECT employees.id,employees.first_name,employees.last_name,roles.title,departments.department_name AS 'department', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id AND employees.manager_id ORDER BY employees.id`;
          dbConnect.query(sql2, (err, res) => {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("*************");
            console.log("\n");
          });
        });
    });
  },
  // Add a new department
  addDep: () => {
    console.log("add department");
    inquirer
      .prompt([
        {
          type: "input",
          name: "department_name",
          message: "Add a new department",
          validate: (newDep) => {
            if (newDep) {
              return true;
            } else {
              return `Please enter the new department`;
            }
          },
        },
      ])
      .then((newDep) => {
        console.log(newDep);
        let sql = `INSERT INTO departments SET ?`;

        dbConnect.query(sql, [newDep], (err, res) => {
          if (err) throw err;
          console.log("added new department!");
          console.table(newDep);
        });
      });
  },

  // Add a new role
  addRole: () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Add a new role",
          validate: (newRole) => {
            if (newRole) {
              return true;
            } else {
              return `Please enter the new role`;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "Add salary",
        },
        {
          type: "input",
          name: "department_id",
        },
      ])
      .then((newRole) => {
        console.log(newRole);
        //let sql = `INSERT INTO roles(title) VALUES ?`;
        let sql = `INSERT INTO roles SET ?`;
        dbConnect.query(sql, [newRole], (err, data) => {
          if (err) throw err;
          console.table(newRole)
          console.log("added new role!");
        });
      });
  },

  // Add a new employee
  addEmp: () => {
    console.log("add employee");
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the new employee's name?",
          validate: (newName) => {
            if (newName) {
              return true;
            } else {
              return `Please enter employee's name`;
            }
          },
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the new employee's last name?",
          validate: (newLastN) => {
            if (newLastN) {
              return true;
            } else {
              return `Please enter employee's last name`;
            }
          },
        },
        {
          type: "input",
          name: "role_id",
          message: "What is the new employee's role?",
          validate: (newRoleId) => {
            if (newRoleId) {
              return true;
            } else {
              return `Please enter employee's role`;
            }
           },
        },
      ])
      .then((newEmp) => {
        console.log(newEmp);
        let sql = `INSERT INTO employees SET ?`;

        dbConnect.query(sql, [newEmp], (err, res) => {
          if (err) throw err;
          console.log("added an employee!");
          // console.table(employees);
          console.table(res);
        });
      });
  },
};

module.exports = queryObj