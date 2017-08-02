let classCreate = require('../../model/class/create').handle;

//路由
let router = {
    //http://localhost:5050/class/create?classname=xx&prop=s`a`q
    'create' : classCreate
}

//处理参数 判断参数合法
let getParams = (req, callback)=>{
    return req;
}
/*
* Promise统一回传方案：{code : "作为data回传", message : "作为附加信息回传"}
*/
let handle = (req, callback)=>{
    req = getParams(req, callback);
    if(!req){
        return ;
    }

    //进入路由
    router[req.option](req).then((res)=>{
        callback(res.data, res.message);
    }).catch((e)=>{
        callback("CATCH_ERROR", e.message);
    })
}

exports.handle = handle;