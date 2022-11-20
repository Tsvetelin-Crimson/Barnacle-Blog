const express = require('express');
var cors = require('cors')
// const { addSession } = require('../utils/userManagement');
// const { trimBody } = require('../utils/requestBodyUtils');

// TODO: Add eventually
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

module.exports = (app) => {
    //app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors())
    // app.use(addSession());
    // app.use(trimBody('password'));
};