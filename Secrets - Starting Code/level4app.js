//jshint esversion:6

require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect('mongodb://127.0.0.1:27017/userDB')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is mandatory']
    },
    password: {
        type: String,
        required: [true, 'username is mandatory']
    }
})

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render("home")
})


app.route('/register')
    .get((req, res) => {
        res.render("register")
    })
    .post((req, res) => {
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        // Store hash in your password DB.
        const newUser = new User({
            username: req.body.username,
            // password: md5(req.body.password)
            password: hash
        })
        newUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render('secrets');
            }
        });
    });

app.route('/login').get((req, res) => {
    res.render("login")
})
    .post((req, res) => {
        const user = req.body.username;
        // const pwd = md5(req.body.password);
        const pwd = req.body.password;
        User.findOne({ username: user }, (err, foundUser) => {
            if (err) {
                console.log(err);
            }
            else {
                if (foundUser) {
                    if (bcrypt.compareSync(pwd, foundUser.password)) {
                        res.render('secrets')
                    }
                }
            }
        })
    })




app.route('/logout')
    .get((req, res) => {
        res.render('home')
    })

app.listen(3000)