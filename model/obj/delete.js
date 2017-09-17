let mysql = require('mysql');

let getSql = (req)=>{
    if(!req.query.classname){
        return undefined;
    }
    if(!req.query.objectid){
        return undefined;
    }
    let sql = "DELETE FROM `obj_" + req.query.classname + "` WHERE `objectid`=" + mysql.escape(req.query.objectid);
    return sql;
}

let deleted = (req, callback)=>{
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
        callback({data : "SUCCESS"});
    })
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        deleted(req, resolve);
    })
}

exports.handle = handle;