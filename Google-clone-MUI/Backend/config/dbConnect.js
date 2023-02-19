const mongoose = require('mongoose');

const connect = ()=>{
    mongoose.connect(process.env.LOCAL_DB, {}, (err)=>{
        if (err){
            console.log(err);
        }
    })
}

module.exports = connect;