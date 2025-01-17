const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

var employees = [];
var eid = 1;

//POST request to add employee
app.post('/addEmployee', (req, res) => {

    const { name, role, salary } = req.body
    const emp = { id: eid++, name, role, salary };
    employees.push(emp);
    res.status(201).send(emp);

});

//GET request to get all employees data
app.get('/getEmployees', (req, res) => {
    res.send(employees);
});

//GET request to get a employee by id
app.get('/getEmployee/:id', (req, res) => {
    const emp = employees.find(e => e.id === parseInt(req.params.id));
    if (!emp) {
        return res.status(400).send("Employee not found");
    }
    res.status(200).send(emp);
});

//PUT request to update employee by id
app.put('/updateEmployee/:id', (req, res) => {
    const emp = employees.find(e => e.id === parseInt(req.params.id));
    if (!emp) {
        return res.status(400).send("Employee not found");
    }
    const { name, role, salary } = req.body
    emp.name = name;
    emp.role = role;
    emp.salary = salary;

    res.status(200).send(emp);
});

//DELETE request to delete employee by id
app.delete('/deleteEmployee/:id', (req, res) => {
    console.log("Deleted");
    const index = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(400).send("Employee not found");
    }
    employees.splice(index, 1);
    return res.send('Deleted');
});

app.listen(port, () => {
    console.log(`Server is running on: ${port}...`);
});