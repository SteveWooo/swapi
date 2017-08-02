let mysql = require('mysql');
// 构建SQL 并检查合法性
let getSql = (req)=>{
    //属性
    let prop = req.query.prop.split('`');
    //类名
    let className = mysql.escape("obj_" + req.query.classname).replace(/\'/g, '`');
    if(prop.length == 0 || className == undefined || className == ""){ //判断合法性
        return undefined;
    }
    //构建属性语句
    let key = prop.map((data)=>{
        let temp = data.split('=');
        return mysql.escape(temp[0]).replace(/\'/g, '`');
    }).join(',');
    let value = prop.map((data)=>{
        let temp = data.split('=');
        return mysql.escape(temp[1]).replace(/\'/g, '"');
    }).join(',');
    let sql = "INSERT INTO " + className + " (" + key + ") VALUES (" + value + ")";
    return sql;
}

//坑：promise回传只能传一个参数
let create = (req, callback)=>{
    let sql = getSql(req);
    if(!sql){
        callback("PARAMS_ERROR");
        return ;
    }

    //建表并catch错误 
    req.mysql.query(sql, (err, field)=>{
        if(err){
            callback({data : "MYSQL_ERROR", message : err.code});
            return ;
        }
        
        callback({data : "SUCCESS"});
    })
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        create(req, resolve);
    })
}

exports.handle = handle;