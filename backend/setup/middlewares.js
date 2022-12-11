const express = require('express');
var cors = require('cors')

// TODO: Add eventually, also figure it out
// var corsOptions = {
//     origin: 'http://localhost:4200/', // should be added via constant/ env variable
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

module.exports = (app) => {
    //app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    // could re-add this
    // app.use(trimBody('password'));
};