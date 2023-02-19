const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/dummydata");

const credentialsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

var tasksArray=[];



var userID;
const dataSchema = new mongoose.Schema({
    "ID": String,
    "date": String,
    "data": Array
})

const usersCollections = mongoose.model("usersCredential", credentialsSchema)
const taskCollections = mongoose.model("usersDataSet", dataSchema)

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render("SignupPage")
})

app.get('/msg', (req, res) => {
    res.send('Hello')
})

app.post('/home', (req, res) => {
    if (req.body.fname != "" && req.body.lname != "" && req.body.mailID != "" && req.body.password != "" && req.body.password === req.body.cpassword) {
        userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.mailID,
            password: req.body.password
        }
        const newUser = new usersCollections(userData)
        newUser.save();

        usersCollections.findOne({ email: req.body.mailID }, async (err, data) => {
            if(err){
                console.log(err);
                res.redirect('/')
            }
            else if(data){
                const flag = (data.password ===  req.body.password);
                if(flag){
                    userID = data;
                    console.log(data);
                    res.render("HomePage", {
                        userName: data.fname,
                        userID : data._id
                    })
                }
            }
        })
    } else {
        res.redirect('/signup')
    }
})

app.post('/mytasks', (req,res)=>{
    console.log(req.body);
    res.render("HomePage", {
        userName: "data.fname",
        userID : "data._id"
    })
    
})


// [{
//     "title": String,
//     "content": String
// }]



// {
//     "ID": String,
//     "date": String,
//     "data": Array
// }
app.listen(3000)