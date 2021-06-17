-- Create new rows containing data in Departments TABLE columns
INSERT INTO departments(department_name)
VALUES ('Internal Audit');


-- Create new rows containing data in Roles TABLE columns
INSERT INTO roles(title, salary, department_id)
VALUES ('Consultant Manager', 150000, 1),
('Sr Consultant', 80000, 1);

-- Create new rows containing data in Employees TABLE columns
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Larisa', 'Hinojosa', 1, NULL),
('Carlos', 'Vazquez',2,1);
