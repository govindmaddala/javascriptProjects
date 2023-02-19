require('dotenv').config({path:'../configurations/.env'});
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const userRegisterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxLength: [30, "Maximum 30 char allowed"],
        minLength: [2, 'Minimum 2 char allowed']
    },
    email: { 
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        validate: [validator.isEmail, "Please provide valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [8, "Password's length should be greater than 7 char"],
        selected: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//To hash the password
userRegisterSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }else{
        this.password = await bcrypt.hash(this.password, 10);
    }
})

//To create JWT Token

userRegisterSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.SECRET_MESSAGE,{
        expiresIn:process.env.EXPIRY_TIME
    })
}

//on login: to match passwords
userRegisterSchema.methods.comparePasswords = async function(passwordFromUser){
        return await bcrypt.compare(passwordFromUser,this.password)
}


//to create resetpassword token
userRegisterSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetToken to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}


module.exports = mongoose.model("user", userRegisterSchema);