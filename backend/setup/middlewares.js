const express = require('express');

// const { addSession } = require('../utils/userManagement');
// const { trimBody } = require('../utils/requestBodyUtils');


module.exports = (app) => {
    //app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));

    // app.use(addSession());
    // app.use(trimBody('password'));
};