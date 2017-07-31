'use strict';

let cluster = require('cluster'),
    http = require('http'),
    os = require('os'),

    conf = require('../config'),
    app = require('./server.js').app,
    clusterCount = conf.clusterCount;

let createServe = (app, port)=>{
    let worker = http.createServer(app).listen(port);
    console.log('Server create at : ' + port);
}

//服务入口
let start = ()=>{
    //进程数为1，直接启动
    if(clusterCount <= 1){
        createServe(app, conf.port);
        return ;
    }

    //保证进程数小于等于CPU核数
    if(clusterCount > os.cpus().length){
        clusterCount = os.cpus().length;
    }

    //主进程
    if(!cluster.master){
        createServe(app, conf.port);
        return ;
    }

    for(let i=0;i<clusterCount;i++){
        cluster.fork();
    }

    //监听异常推出进程
    cluster.on('exit').then((worker, code, signal)=>{
        console.error("Proscess crashed ! pid : " + worker.pid);
        cluster.fork();
    })
}

if(require.main === module){
    console.log('server master start')
    start();
}