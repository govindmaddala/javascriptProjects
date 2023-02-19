require('dotenv').config('../.env');
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandle = require('../utils/ErrorHandle');
const jwt = require('jsonwebtoken');

const isLogged = CatchAsyncErrors(async(req,res,next)=>{
    var token = req.rawHeaders[9].split('=');
    token = token[1]
    if (!token) {
        return next(new ErrorHandle('Please Login', 401))
    }
    const decodedData = jwt.verify(token, process.env.SECRET_MESSAGE);
    req.user = await UserCredentialsModel.findById(decodedData.id)
    console.log(req.user);
    next();
})

module.exports = isLogged;