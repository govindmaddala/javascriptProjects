require('dotenv').config('.env');
const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.LOCAL_DB).then((data)=>{
        console.log(`database is connected on ${data.connection.host}`);
    })
}

module.exports = connectDB;