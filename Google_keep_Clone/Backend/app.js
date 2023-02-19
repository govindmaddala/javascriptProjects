require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const app = express();
const cors = require('cors');

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(session({
    secret: "knknknkxnslddkodxknkxnibdx",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect("mongodb://127.0.0.1:27017/level5");
const credentialsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email:String,
    username: String,
    password: String
})
credentialsSchema.plugin(passportLocalMongoose);
const User = mongoose.model("usercredential", credentialsSchema);

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/backend',(req,res)=>{
    res.send("This is backend")
})

app.post('/auth/register',(req,res)=>{
    console.log("Register",req.body.username);
})

app.put('/auth/forgot',(req,res)=>{
    console.log("from put",req.body);
})

app.listen(5000,(err)=>{
    if(err){console.log(err);}
    else{console.log("Backend Server is running on 5000");}
})

