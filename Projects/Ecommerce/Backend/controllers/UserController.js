const CatchAsyncErrors = require('../utils/CatchAsyncErrors');
const ErrorHandle = require('../utils/ErrorHandle')
const User = require('../models/UserCredentialsModel');
const createAndSendToken = require('../utils/generateJWTtoken');
const sendPasswordResetMail = require('../utils/MailHandler.js');
const crypto = require('crypto');

exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        if (passwordRegex.test(password)) {
            const newUser = await User.create(req.body);
            createAndSendToken(newUser, 201, res);
        } else {
            return next(new ErrorHandle("Enter standard password", 400));
        }
    } else {
        return next(new ErrorHandle("User already existed", 400));
    }
})

exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //if no email or password is null
    if (!email || !password) {
        return next(new ErrorHandle("Enter email and password", 400));
    }
    const userFound = await User.findOne({ email })
    //Since in schema, we gave select: false for password, now it is imp to give 
    //const userFound = await User.findOne({email}).selected("+password"); this is not working and in schema "selected: false" is commented
    if (!userFound) {
        return next(new ErrorHandle("User not existed", 404));
    }

    const passwordMatched = await userFound.comparePasswords(password);
    if (passwordMatched) {
        // const token = await userFound.getJWTToken()
        // return res.status(200).json({
        //     success:true,
        //     token
        // })

        //above code is replaced by below single line which does the work to generate token and store in Cookie

        createAndSendToken(userFound, 200, res);
    } else {
        return next(new ErrorHandle("Invalid email or password", 401));
    }
})


exports.logOut = CatchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
        return next(new ErrorHandle("User not existed", 404));
    }

    const resetToken = await foundUser.createResetPasswordToken();
    await foundUser.save({ validateBeforeSave: false })

    const verificationURL = `${req.protocol}://${req.get("host")}/api/v1/users/password/reset?token=${resetToken}`;

    const mailMessage = `Your password reset token is ${verificationURL} and if you're not requested, please check your account`;

    let sentMail;

    try {
        sentMail = await sendPasswordResetMail({
            email: foundUser.email,
            subject: "Password reset from Ecommerce",
            mailMessage: mailMessage
        })

    } catch (error) {
        foundUser.resetPasswordToken = undefined;
        foundUser.resetPasswordExpire = undefined;
    }
    if(sentMail){
        return res.status(200)
        .json({
            success: true,
            message: `Mail sent to ${foundUser.email}, please check and reset the password`
        })
    }else{
        return res.status(400)
        .json({
            success: false,
            message: `Error in sending mail to ${foundUser.email}, please try again`
        })
    }
})

exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {

    const { token } = req.query;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const userFound = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!userFound) {
        return next(new ErrorHandle("Reset password token has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandle("Password doesn't match", 400))
    }

    userFound.password = req.body.password;
    userFound.resetPasswordToken = undefined;
    userFound.resetPasswordExpire = undefined;

    await userFound.save();
    createAndSendToken(userFound, 200, res);

});


exports.getDetails = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    return res.status(200)
        .json({
            success: true,
            user,
        })
});


exports.updatePassword = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const passwordMatched = await user.comparePasswords(req.body.oldPassword);
    if(!passwordMatched){
        return next(new ErrorHandle("Invalid email or password", 401));
    }

    if(req.body.newPassword !== req.body.confirmNewPassword){
        return next(new ErrorHandle("Passwords doesn't match", 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    createAndSendToken(user, 200, res);
});


exports.updateProfile = CatchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        username: req.body.username,
        email:req.body.email
    }
    // rest other updations will be done later during cloud link-up
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    return res.status(200)
        .json({
            success: true,
            user,
        })
});