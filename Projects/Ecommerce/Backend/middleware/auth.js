require('dotenv').config({ path: '../configurations/.env' });
const CatchAsyncError = require("../utils/CatchAsyncErrors");
const ErrorHandle = require("../utils/ErrorHandle");
const jwt = require('jsonwebtoken');
const UserCredentialsModel = require('../models/UserCredentialsModel');

exports.isAuthenticated = CatchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandle('Please Login', 401))
    }

    const decodedData = jwt.verify(token, process.env.SECRET_MESSAGE);

    req.user = await UserCredentialsModel.findById(decodedData.id)
    next();
})

exports.userRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandle(`Role as ${req.user.role} is not authorized to perform this task`, 401));
        }
        next();
    }
}