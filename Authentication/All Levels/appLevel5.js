require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
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

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render("SignupPage")
})

app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("HomePage")
    } else {
        res.redirect('/')
    }
})

app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/signup')
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })
})

app.post('/signup', (req, res) => {
    if (req.body.fname != "" && req.body.lname != "" && req.body.username != "" && req.body.password != "" && req.body.password === req.body.cpassword) {
        User.register({
            fname: req.body.fname, lname: req.body.lname,
            email:req.body.username,username: req.body.username
        }, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect('/')
            } else if (user) {
                passport.authenticate("local" ,{failureRedirect:'/'})(req, res, () => {
                    res.redirect('/home')
                })
            }
        })
    }
    else {
        res.redirect('/signup')
    }
})
app.listen(3000)

