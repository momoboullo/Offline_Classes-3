const express = require('express');
const app = express();
// get the router
const router = require('./router/appRouting.js');

// get the mongodb
const mongodb = require('./database/dbOperations');

const hostname = '127.0.0.1';
const port = 9000;

app.get('/',(request,response) => {
    response.send(`<h1>Welcome to Infosys Employee Services</h1>`);
});

// Application Routing for CRUD Operations
router.mapRoutes(app);

// Create MongoDB Connection when application starts
mongodb.mongoConnet(() => {
    app.listen(port,hostname,() => {
        console.log(`Server is started at http://${hostname}:${port}`);
    });
});

