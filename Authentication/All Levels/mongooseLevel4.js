require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/level4");
const bcrypt = require('bcrypt')

const credentialsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

const usersCollections = mongoose.model("usercredential", credentialsSchema)

const user = {
    email: "govindmvn@gmail.com",
    // email:"ramakrishna@gmail.com",
    password: "123456"
}


usersCollections.findOne({ email: user.email }, async (err, data) => {
    if (!err && data != null) {
        if (bcrypt.compareSync(user.password,data.password)) {
            console.log("user is authenticated");
        }
    }
    else if (err) {
        console.log(err);
    }
    else {
        console.log("No user found");
    }
    mongoose.disconnect(err => {
        if (err) {
            console.log(err);
        }
    })
})