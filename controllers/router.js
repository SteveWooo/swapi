let classCtrl = require('./class/classHandle').handle,
    objCtrl = require('./obj/objHandle').handle;

/*
 * 创建类： http://host:port/{class}/{create}?_appid=xxx&prop=prop1`prop2`prop3
 *
*/
let router = {
    'class' : {
        'create' : classCtrl
    },
    'obj' : {
        'create' : objCtrl
    },
    'list' : {

    }
}

// 封装 请求path
// req.type;req.option;
let getReq = (req, callback)=>{
    let path = req.path.split('/').slice(1);
    if(path[0] === 'favicon.ico'){
        callback("200");
        return undefined;
    }
    
    //赋值方法
    req.type = path[0];
    req.option = path[1];

    //校验路由是否存在
    if(!router[req.type] || !router[req.type][req.option]){
        callback(403);
        return undefined;
    }

    return req;
}

/*
* 入口，处理全局回掉以及路由入口
*/
let handle = (req, res, next)=>{
    //todo 
    let callback = (data, message)=>{
        var result;

        //直接返回状态码
        if(typeof data == 'number'){
            res.sendStatus(data);
            return ;
        }

        //返回错误码
        if(typeof data == 'string'){
            result = {
                data : data,
                message : message
            }

            res.send(JSON.stringify(result));
            return ;
        }

        //正常回调
        if(typeof data == 'object'){

        }
        req.mysql.end();
        res.send(data);
        return ;
    }
    //封装request
    req = getReq(req, callback);
    if(!req) {
        return undefined;
    }

    //路由
    router[req.type][req.option](req, callback);
}

exports.handle = handle;