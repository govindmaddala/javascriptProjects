const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const plm = require('passport-local-mongoose')
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: "this is secret message",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
});
userSchema.plugin(plm);
const newUser = mongoose.model('user', userSchema)
passport.use(newUser.createStrategy())
passport.serializeUser(newUser.serializeUser())
passport.deserializeUser(newUser.deserializeUser())