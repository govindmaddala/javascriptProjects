const express = require("express");
const bodyparser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/images/Home', (req, res) => {
    res.send("Welcome Home..!")
})

const databaseConnect = require('./Database/DatabaseConnect')
databaseConnect();
const imageModel = require('./Database/User')
//--------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/images/upload', upload.single("filename"), async (req, res, next) => {
    const saveImage = new imageModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync("./uploads/" + req.file.filename)
        }
    })
    await saveImage.save()
        .then((res) => {
            console.log('Image uploaded');
        }).catch((err) => {
            console.log(err);
        });

    res.status(200).json({
        success:true,
        message:"Image is uploaded"
    })
})

app.get('/images/get',async (req,res,next)=>{
    const images = await imageModel.find();
    // res.json(images);
    return res.status(200).json(images)
})


//---------------------------------------------------------------------

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})