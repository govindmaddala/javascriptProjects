//jshint esversion:6

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
/////////////////    packages are imported ////////////////////
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')


const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

//////////////// Session is created     /////////////////////

app.use(session({
    secret: "this is govind",
    resave: false,
    saveUninitialized: false
}));

////////////// passport is initialized and session will be managed by passport //////////////////////

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/userDB');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is mandatory"]
    },
    password: String
});

///////////////// We setup userSchema to use passportLocalMongoose  ////////////////////
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema);

//////////////////////////////////  Simplified Passport/Passport-Local Configuration  ////////////////////////////////////

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"

passport.use(User.createStrategy());   //passportLocalMongoose to create local login strategy

// setup passport to serialize and de-serialize our user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


///////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/secrets', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});


app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});


app.post('/register', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/register')
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect('secrets')
            })
        }
    })
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/login')
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect('secrets')
            })
        }
    })
});

app.listen(5000)