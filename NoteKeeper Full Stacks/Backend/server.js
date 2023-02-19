const express = require("express");
const bodyparser = require('body-parser')
const cors = require('cors')

const authAPI = require("./APIs/AuthAPI.js");
const emailAPI = require('./APIs/emailAPI')
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const indexPage = (req, res) => {
    res.send("Welcome Home..!")
}

const databaseConnect = require('./Database/DatabaseConnect')
databaseConnect();
const User = require('./Database/User')


app.get('/', indexPage);

app.use('/auth', authAPI)
app.use('/email',emailAPI)

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})