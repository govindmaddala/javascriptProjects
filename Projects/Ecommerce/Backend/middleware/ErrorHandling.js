const ErrorHandle = require('../utils/ErrorHandle');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal error";

    if(err.name === 'CastError'){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandle(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}