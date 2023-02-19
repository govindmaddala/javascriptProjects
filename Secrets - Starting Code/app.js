//jshint esversion:6

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
/////////////////    packages are imported ////////////////////
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
//Leve-6
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');


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
    username: String,
    password: String,
    googleId: String
    
});

///////////////// We setup userSchema to use passportLocalMongoose  ////////////////////
userSchema.plugin(passportLocalMongoose)
//L-6
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

//////////////////////////////////  Simplified Passport/Passport-Local Configuration  ////////////////////////////////////

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"

passport.use(User.createStrategy());   //passportLocalMongoose to create local login strategy

// setup passport to serialize and de-serialize our user
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//L-6

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

//Level-6
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


///////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register')
});

//L-6
app.get('/auth/google',
    passport.authenticate('google', { scope: ["profile"] })
);

//L-6
app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect secrets page
        res.redirect('/secrets');
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

app.listen(3000)