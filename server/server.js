'use strict';

let app = require('express')();
//路由器
let controllers = require('../controllers/router.js').handle;

let handleRequest = (req, res, next)=>{
    //start
    next();
}

app.get('*', handleRequest, controllers);

exports.app = app;