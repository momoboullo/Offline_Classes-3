// get the database
const mongodb = require('../database/dbOperations');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let mapRoutes = (app) => {

    // READ All Employees
    app.get('/api/employees/',(request,response) => {
        // Mongo DB
        let db = mongodb.getDB();
        db.collection('employees').find().toArray((err, employees) => {
            response.json(employees);
        });
    });

    // READ a single Employee
    app.get('/api/employees/:id' , (request,response) => {
        let empId = Number.parseInt(request.params.id);
        // Mongo DB
        let db = mongodb.getDB();
        db.collection('employees').find({id : empId}).toArray((err, employees) => {
            response.json(employees);
        });
    });

    // CREATE New Employee
    app.post('/api/employees/' , urlencodedParser , (request,response) => {
        // find the last id from table
        let db = mongodb.getDB();
        db.collection('employees').find().sort({_id:-1}).limit(1).toArray((err, employees) => {
            let newEmployeeId = 1;
            if(employees.length > 0){
                newEmployeeId = employees[0].id + 1;
            }
            // Get Employee Data from the Form
            let employee = {
                id : newEmployeeId,
                first_name : request.body.first_name,
                last_name : request.body.last_name,
                email : request.body.email,
                gender : request.body.gender,
                ip_address : request.body.ip_address
            };
            db.collection('employees').insertOne(employee , (err , r) => {
                console.log('New Employee Inserted..');
                response.json(employee);
            });
        });
    });

    // UPDATE Single Employee
    app.put('/api/employees/:id', urlencodedParser , (request,response) => {
        let empId = Number.parseInt(request.params.id);
        let newEmployee = {
            id : empId,
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            gender : request.body.gender,
            ip_address : request.body.ip_address
        };
        // MongoDB connection Object
        let db = mongodb.getDB();
        db.collection('employees').findOneAndUpdate({id:empId} , {$set: newEmployee} , (err , r) => {
            console.log('Record is Updated');
            response.json(newEmployee);
        });
    });

    // DELETE Employee
    app.delete('/api/employees/:id',(request,response) => {
        let empId = Number.parseInt(request.params.id);
        // Mongo DB connection
        let db  = mongodb.getDB();
        db.collection('employees').deleteOne({id : empId}, (err , r) => {
            console.log('Record is Deleted with Id : ' , empId);
            response.json(r);
        });
    });
};

module.exports = {
    mapRoutes
};