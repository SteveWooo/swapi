let mysql = require('mysql');

/*
* 1：创建类
*/

let buildProp = (req)=>{
    //属性
    let prop = req.query.prop.split('`');
    //类名
    let classname = mysql.escape("obj_" + req.query.classname).replace(/\'/g, '`');
    if(prop.length == 0 || classname == undefined || classname == ""){ //判断合法性
        return undefined;
    }
    //构建属性语句
    let key = prop.map((data)=>{
        return mysql.escape(data + " text").replace(/\'/g, '') ;
    }).join(',');

    return {
        key : key,
        classname : classname
    }
}

//插入classes表。
let insertClass = (req, callback)=>{
    let sql = "INSERT INTO `classes` (`classname`, `prop`) VALUES ('"+req.query.classname+"', '"+req.query.prop.replace(/\`/g, '\`')+"')";
    req.mysql.query(sql, (err, field)=>{
        if(err){
            callback(err.code);
            return ;
        }

        callback({data : "SUCCESS"});
    })
}

// 构建建表SQL 并检查合法性
let getSql = (req)=>{
    let prop = buildProp(req);
    if(!prop){
        callback('PARAMS_ERROR');
        return ;
    }
    let sql = "CREATE TABLE " + prop.classname + " (" + prop.key + ") DEFAULT CHARSET=UTF8";
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
        
        insertClass(req, callback);
    })
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        create(req, resolve);
    })
}

exports.handle = handle;