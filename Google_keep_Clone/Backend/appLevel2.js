require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/level2");
const mc = require('mongoose-encryption')

const credentialsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

// const secret_msg = "qwertyuiopasdfghjklzxcvbnm,.!@#$%^&*()_+:;?>/"

credentialsSchema.plugin(mc, { secret: process.env.ENCRYPTION_KEY, encryptedFields: ['password'] })

const app = express();

const usersCollections = mongoose.model("usersCredential", credentialsSchema)

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render("SignupPage")
})

app.post('/home', (req, res) => {
    if (req.body.fname != "" && req.body.lname != "" && req.body.mailID != "" && req.body.password != "" && req.body.password === req.body.cpassword) {
        userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.mailID,
            password: req.body.password
        }
        //To check if user is already there in our database and if not there, then new user is created
        usersCollections.findOne({ email: req.body.mailID }, async (err, data) => {
            if (data === null) {
                const newUser = new usersCollections(userData)
                newUser.save();
                res.render("HomePage", {
                    userName: req.body.mailID
                })
            }
            else {
                console.log(err);
                res.redirect('/')
            }
        });
    }
    else {
        res.redirect('/signup')
    }
})
app.listen(3005)







//Double authentication
// usersCollections.findOne({ email: req.body.mailID }, async (error, data) => {
//     if (!error) {
//         // console.log(data);
//         res.render("HomePage", {
//             userName: data.fname
//         })
//     }
// });