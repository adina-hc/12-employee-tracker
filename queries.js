const dbConnect = require("./config");
const inquirer = require("inquirer");
const { listenerCount } = require("./config");
// const displayMenu = require("./menu")
// Query to view all employees
const queryObj = {
  viewAllEmp: () => {
    let sql = `SELECT employees.id,employees.first_name,employees.last_name,roles.title,departments.department_name AS 'department', roles.salary
        FROM employees, roles, departments WHERE departments.id = roles.department_id
        AND roles.id = employees.role_id
        ORDER BY employees.id`;
    dbConnect.query(sql, (err, response) => {
      if (err) throw err;
      console.log("\n");
      console.table(response);
      console.log("*************");
    });
  },
  viewAllDep: () => {
    let sql = `
        SELECT id, department_name AS 'department'
        FROM departments`;
    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("*************");
    });
  },
  viewAllEmpByMgr: () => {
    let sql = `
    SELECT IFNULL(mgrID, 'None') AS finalResult from (SELECT concat(Mgr_ID,' ', manager) as mgrID FROM(SELECT  employees.id, employees.first_name, employees.last_name, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager, mgr.id AS Mgr_ID FROM employees LEFT OUTER JOIN employees mgr ON employees.manager_id = mgr.id INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON departments.id = roles.department_id ORDER by employees.id) AS manager LEFT OUTER JOIN employees r ON manager.Mgr_ID = r.id) as mgridfinal`; 

    dbConnect.query(sql, (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'mgrChoice',
            choices() {
              return res.map((selection) => selection.finalResult);
            },
            message: 'Select Manager',
          },
        ])
        .then((answer) => {
          console.log(answer);

          let mgrName = parseInt(answer.mgrChoice.slice(0, answer.mgrChoice.indexOf(' ')));
          console.log(mgrName);
          let sql2 = `
          SELECT employees.id,employees.first_name,employees.last_name,roles.title,departments.department_name AS 'department', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id AND employees.manager_id ORDER BY employees.id`;
        dbConnect.query(sql2, (err, res) => {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("*************");
        });
        });
    });
    },

  addDep: () => {
    inquirer
      .prompt([
        {
          name: "newDep",
          message: "What new department would you like to add?",
        },
      ])
      .then(({ newDep }) => {
        let sql = `
            INSERT INTO departments(department_name)
            VALUES (?)`;

        dbConnect.query(sql, [newDep], (err, data) => {
          if (err) throw err;
          // console.log(data)
          console.log("added new department!");
        });
      });
  },
  addRole: () => {
    inquirer
      .prompt([
        {
          name: "newRole",
          message: "What new role would you like to add?",
        },
      ])
      .then(({ newRole }) => {
        let sql = `
        INSERT INTO roles(title)
        VALUES (?)`;

        dbConnect.query(sql, [newRole], (err, data) => {
          if (err) throw err;
          // console.log(data)
          console.log("added new role!");
        });
      });
  },
  addEmp: () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
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
          name: "lastName",
          message: "What is the new employee's last name?",
          validate: (newLastN) => {
            if (newLastN) {
              return true;
            } else {
              return `Please enter employee's last name`;
            }
          },
        },
      ])
      .then(({ newEmp }) => {
        let sql = `
        INSERT INTO employees(first_name, last_name, role.title, manager_id)
        VALUES (?)`;

        dbConnect.query(sql, [newEmp], (err, data) => {
          if (err) throw err;
          // console.log(data)
          console.log("added an employee!");
        });
      });
  },
};

module.exports = queryObj