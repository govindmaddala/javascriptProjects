require('dotenv').config('../../Backend/.env')
const jwt = require('jsonwebtoken');

module.exports = (data)=>{
    return jwt.sign(
        data, process.env.JSON_SECRET ,{expiresIn: '7d'});
}



