let objCreate = require('../../model/obj/create').handle;

//路由
let router = {
    //http://localhost:5050/obj/create?classname=xx&prop=name=q`age=14
    'create' : objCreate
}

//处理参数 判断参数合法
let getParams = (req, callback)=>{
    if(!router[req.option]){
        callback(403);
        return undefined;
    }
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
        if(typeof res == 'string'){
            callback(res);
            return ;
        }
        callback(res.data, res.message);
    }).catch((e)=>{
        callback("CATCH_ERROR", e.message);
    })
}

exports.handle = handle;