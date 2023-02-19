const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://127.0.0.1:27017/level4')

const l3Schema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String
});

const app = express()
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

const usercredential = mongoose.model("usercredential",l3Schema)

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render("SignupPage")
})

const saltRounds = 10;

app.post('/home', (req, res) => {
    if (req.body.fname != "" && req.body.lname != "" && req.body.mailID != "" && req.body.password != "" && req.body.password === req.body.cpassword) {
        userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.mailID,
            password: bcrypt.hashSync(req.body.password,saltRounds)
        }
        //To check if user is already there in our database and if not there, then new user is created
        usercredential.findOne({ email: req.body.mailID }, async (err, data) => {
            if (data === null) {
                const newUser = new usercredential(userData)
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
app.listen(3000)