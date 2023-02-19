const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique:true
        
    },
    img:{
        data:Buffer,
        contentType:String
    }
});

module.exports = mongoose.model("image", imageSchema);