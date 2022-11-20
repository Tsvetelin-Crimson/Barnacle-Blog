const mongoose = require('mongoose');

const databaseName = 'barnacleBlog';
const DB_CONNECTION_STRING = `mongodb://localhost:27017/${databaseName}`;

module.exports = async (app) => {
    try{
        await mongoose.connect(DB_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Database connected with name ${databaseName}.`);
    } catch {
        console.error(`Could not connect to database with name ${databaseName}.`);
    }

};