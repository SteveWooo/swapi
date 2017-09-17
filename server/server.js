'use strict';

let app = require('express')(),
    mysql = require('mysql'),
    conf = require('../config.json');
//路由器
let router = require('../controllers/router.js').handle;

let handleRequest = (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    // mysql : 
    req.mysql = mysql.createConnection(conf.mysql);
    req.mysql.connect((err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
}

app.get('*', handleRequest, router);

exports.app = app;



var P = function(fun){
    this.then = function(func){
        fun(func)
    }

    return this;
}

var p = new P(function(resolve){
    setTimeout(function(){
        resolve('haha')
    }, 1000)
})

p.then(function(data){
    console.log(data)
})