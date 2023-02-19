const mongoose = require('mongoose')

const databaseConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/ImageHandling", (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database is connected");
        }
    })
}

module.exports = databaseConnect