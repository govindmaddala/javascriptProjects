//To generate token and storing in cookie
require('dotenv').config({path:'../configurations/.env'})
const createAndSendToken = (user,statuCode,res)=>{
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    }

    res.status(statuCode).cookie('token',token,options).json({
        success:true,
        // user,
        token
    });
}

module.exports = createAndSendToken;