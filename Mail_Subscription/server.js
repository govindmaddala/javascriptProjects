const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/mail.html');
});

app.post('/',function(req,res){
    console.log(req.body);
})

app.listen(3000);