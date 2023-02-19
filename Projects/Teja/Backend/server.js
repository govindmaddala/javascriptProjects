const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Message from Back end')
})

app.post('/',(req,res)=>{
    console.log(req.body);
})
app.listen(5000)