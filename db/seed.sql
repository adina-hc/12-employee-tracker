USE employees_db;

-- Create new rows containing data in Departments TABLE columns
INSERT INTO departments(department_name)
VALUES ('Internal Audit'), ('Sales'), ('Legal'), ('Finance'), ('IT'), ('Procurement');



-- Create new rows containing data in Roles TABLE columns
INSERT INTO roles(title, salary, department_id)
VALUES ('Consultant Manager', 150000, 1),
('Sr Consultant', 80000, 1),
('Sales Representative', 85000, 2),
('Legal Manager', 200000, 3),
('Legal Assistant', 50000, 3),
('Controller', 100000, 4),
('Sr. Accountant', 85000,4),
('IT Manager', 135000, 5),
('Business Analyst', 95000, 5),
('Procurement Manager', 125000, 6),
('Procurement Analyst', 65000, 6);

-- Create new rows containing data in Employees TABLE columns
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Larisa', 'Hinojosa', 1, NULL),
('Carlos', 'Vazquez',2,1),
('Esperanza','Martinez',4,NULL),
('Juanita','Lopez',5,3);
