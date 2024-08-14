const {constant} = require("../constant")
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message:err.message,stackTrace:err.stack});
            break;
        case constant.NOT_FOUND:
            res.json({title:"not Found",message:err.message,stackTrace:err.stack});
            break;

        case constant.FORBIDDEN:
            res.json({title:"forbidden",message:err.message,stackTrace:err.stack});
            break;

        case constant.UNAUTHORIZED:
            res.json({title:"unauthorized",message:err.message,stackTrace:err.stack});
            break;

        case constant.SERVER_ERROR:
            res.json({title:"Server Error",message:err.message,stackTrace:err.stack});
            break;

        default:
            console.log("no error");
            
            break;
    }
}
module.exports = errorHandler;