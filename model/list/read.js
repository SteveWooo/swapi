var myslq = require('mysql');

var read = function(req){
    return new Promise((resolve, reject)=>{
        var listid = req.query.listid;
        var category = req.query.category;
        var sql = "";

        //毒列表
        if(!listid && !category){
            sql = "SELECT * FROM `lists`";
        } else {
            sql = "SELECT * FROM `list_"+category+"_"+listid+"`";
        }
        req.mysql.query(sql, function(err, row){
            if(err){
                reject(err);
                return ;
            }
            resolve({data : row});
        })
    })
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        read(req).then(result=>{
            resolve(result);
        })
        .catch(e=>{
            resolve(e.code);
        })
    })
}

exports.handle = handle;