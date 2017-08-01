'use strict';

let app = require('express')(),
    mysql = require('mysql'),
    conf = require('../config.json');
//路由器
let router = require('../controllers/router.js').handle;

let handleRequest = (req, res, next)=>{
    // mysql : 
    req.mysql = mysql.createConnection(conf.mysql);
    req.mysql.connect();
    next();
}

app.get('*', handleRequest, router);

exports.app = app;