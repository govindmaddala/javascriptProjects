require('dotenv').config('../.env')
const jwt = require('jsonwebtoken')

const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '7d' });
}
module.exports = createToken;