let mysql = require('mysql');

let getSql = (req)=>{

    if(!req.query.classname) {
        return undefined;
    }
    let sql = "SELECT * FROM `obj_"+req.query.classname+"`";

    //筛选条件
    if(req.query.filter) {
        sql += " WHERE " + req.query.filter;
    }

    //过滤翻页
    if(req.query.page) {
        sql += " limit " + req.query.page;
    }else {
        //默认
        sql += " limit 0, 10";
    }

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