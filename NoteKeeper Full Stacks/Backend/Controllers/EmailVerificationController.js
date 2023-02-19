require('dotenv').config('../.env')
const jwt= require('jsonwebtoken')
const User = require('../Database/User')

const EmailVerificationController = async (req,res)=>{
    const {token} = req.body
    if(!token){
        return res.status(404).json({ status: false, message: "Token not found" })
    }

    let decodedToken;
    try{
        decodedToken = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(err){
        return res.status(404).json({ status: false, message: "Invalid Token" ,error: err })
    }
    
    const userFound = await User.findOne({email: decoded.email})
    if(!userFound){
        return res.status(404).json({ status: false, message: "User not found" })
    }

    userFound.userverified = true
    await userFound.save();

    res.status(200).json({ success: true, message: "Email is verified" })
}

module.exports = EmailVerificationController