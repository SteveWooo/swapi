let handle = (req, res, next)=>{
    console.log(req.query);
    res.send(req.query.name);
}

exports.handle = handle;