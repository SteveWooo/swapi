var mysql = require('mysql');

function add(req){
	return new Promise((resolve, reject)=>{
		var listid = req.query.listid;
        var category = req.query.category;
        var objectid = req.query.objectid;

        if(!listid || !category || !objectid){
        	reject({code : "PARAM_ERROR"});
        	return ;
        }

        let sql = "INSERT INTO `list_"+category+"_"+listid+"` (`objectid`, `score`) VALUES ("+mysql.escape(objectid)+",'0')";
        req.mysql.query(sql, function(err){
        	if(err){
        		reject(err);
        		return ;
        	}

        	resolve({data : "add success.objectid:" + objectid});
        })
	})
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        add(req).then(result=>{
            resolve(result);
        })
        .catch(e=>{
            resolve(e.code);
        })
    })
}

exports.handle = handle;