//import mongoose module
const mongoose = require('mongoose');
//create user shema
const noteShema = mongoose.Schema({
    // attr: type
    
    note:String,
    mention: String,
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course" // nom de model 
        }
    ],
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" // nom de model 
        }
    ],
});
// affect model name to shema
const note = mongoose.model("Note", noteShema);
//make match importable
module.exports = note;