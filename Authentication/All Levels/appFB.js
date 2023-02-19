//jshint esversion:6

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
//Leve-6
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');


const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))


app.use(session({
    secret: "this is govind",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/facebookDB');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    facebookId: String
});

userSchema.plugin(passportLocalMongoose)
//L-6
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy()); 

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: "829710441523026",
    clientSecret: "3f54d3ae38e87d99940cb3026f094c96",
    callbackURL: "http://localhost:3000/auth/facebook/home"
},
    function (accessToken, refreshToken, profile, cb) {
        /*
        profile returns the following:
        {
            id: '103149292554951',
            username: undefined,
            displayName: 'Govind Maddala',
            name: {
                familyName: undefined,
                givenName: undefined,
                middleName: undefined
            },
            gender: undefined,
            profileUrl: undefined,
            provider: 'facebook',
            _raw: '{"name":"Govind Maddala","id":"103149292554951"}',
            _json: { name: 'Govind Maddala', id: '103149292554951' }
        }
        
        */
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render("SignupPage")
})

//L-6
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'user_photos'] }));

app.get('/auth/facebook/home',
    passport.authenticate('facebook', { failureRedirect: '/signup' }),
    function (req, res) {
        res.redirect('/home');
    });

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
        }
    })
})

// app.post('/signup', (req, res) => {
//     if (req.body.fname != "" && req.body.lname != "" && req.body.username != "" && req.body.password != "" && req.body.password === req.body.cpassword) {
//         User.register({
//             fname: req.body.fname, lname: req.body.lname,
//             email: req.body.username, username: req.body.username
//         }, req.body.password, (err, user) => {
//             if (err) {
//                 console.log(err);
//                 res.redirect('/')
//             } else if (user) {
//                 passport.authenticate("local")(req, res, () => {
//                     res.redirect('/home')
//                 })
//             }
//         })
//     }
//     else {
//         res.redirect('/signup')
//     }
// })
app.listen(3000)