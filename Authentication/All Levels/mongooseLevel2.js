require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/level3");
const encrypt = require('mongoose-encryption')


const credentialsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

credentialsSchema.plugin(encrypt,{secret:process.env.ENCRYPTION_KEY,encryptedFields:['password'],additionalAuthenticatedFields:["fname"]})

const usersCollections = mongoose.model("usersCredential", credentialsSchema)

const user = {
    // email:"jai@krishna.com",
    // email:"govindmvn@gmail.com",
    // email:"ramakrishna@gmail.com",
    email:"chandrika.konathala@gmail.com",
    password:"123456"
}


usersCollections.findOne({email:user.email},async (err,data)=>{
    if(!err && data!= null){
        if(data.password === user.password){
            console.log("user is authenticated");
        }
    }
    else if(err){
        console.log(err);
    }
    else{
        console.log("No user found");
    }
    mongoose.disconnect(err=>{
        if(err){
            console.log(err);
        }
    })
})