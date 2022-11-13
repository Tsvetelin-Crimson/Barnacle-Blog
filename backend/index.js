const express = require('express');

const databaseSetup = require('./setup/database');
const middlewaresSetup = require('./setup/middlewares');
const routesSetup = require('./setup/routes');

run();

async function run(){
    const app = express();

    await databaseSetup(app);
    middlewaresSetup(app);
    routesSetup(app);
    app.listen(3000, () => console.log('Server started on port 3000.'));
}