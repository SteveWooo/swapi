let mysql = require('mysql');

/*
* 1：查询类列表
*/

let getSql = (req)=>{
    let sql = "SELECT * FROM `classes`";
    return sql;
}

let read = (req, callback)=>{
    let sql = getSql(req);
    if(!sql){
        callback("PARAMS_ERROR");
        return undefined;
    }

    req.mysql.query(sql, (err, row, field)=>{
        if(err){
            callback({data : "MYSQL_ERROR", message : err.code});
            return undefined;
        }
        callback({data:row});
    })
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        read(req, resolve);
    })
}

exports.handle = handle;