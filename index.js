const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

var employees = [];
var eid = 1;

app.post('/addEmployee', (req, res) => {

    const { name, role, salary } = req.body
    const emp = { id: eid++, name, role, salary };
    employees.push(emp);
    res.status(201).send(emp);

});

app.get('/getEmployees', (req, res) => {
    res.send(employees);
});

app.listen(port, () => {
    console.log(`Server is running on: ${port}...`);
});