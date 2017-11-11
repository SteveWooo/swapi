let mysql = require('mysql');

function insertList(req){
	return new Promise((resolve, reject)=>{
		var listid = req.query.listid;
		var category = req.query.category;

		var sql = "INSERT INTO `lists` (`listid`, `category`) VALUES ("+mysql.escape(listid)+", "+mysql.escape(category)+")"
		req.mysql.query(sql, function(err){
			if(err){
				reject(err);
				return ;
			}
			resolve();
		})
	})
}

//创建列表
////http://localhost:5050/list/create?listid=xx&category=xx
function getSql(req){
	var listid = req.query.listid;
	var category = req.query.category;

	if(!listid || ! category){
		return undefined;
	}

	var sql = "CREATE TABLE " + '`list_' + category + "_" + listid + "`"
		 + " ("+mysql.escape("`objectid` text").replace(/\'/g, '')
		 +", "+mysql.escape("`score` text").replace(/\'/g, '')+") DEFAULT CHARSET=UTF8";
	return sql;
}

function create(req){
	return new Promise((resolve, reject)=>{
		var sql = getSql(req);
		if(!sql){
			reject({
				code : "PARAM_ERROR"
			});
			return ;
		}
		req.mysql.query(sql, function(err){
			if(err){
				reject(err);
				return ;
			}
			resolve();
		})
	})
}

let handle = (req)=>{
    return new Promise((resolve)=>{
        create(req).then(result=>{
        	return insertList(req);
        }).then(result=>{
        	resolve({data : "create success.Listid:" + req.query.listid});
        })
        .catch(e=>{
        	resolve(e.code);
        })
    })
}

exports.handle = handle;