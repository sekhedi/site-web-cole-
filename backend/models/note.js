//import mongoose module
const mongoose = require('mongoose');
//create user shema
const noteShema = mongoose.Schema({
    // attr: type
    
    note:String,
    mension: String,
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course" // nom de model 
        }
    ],
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student" // nom de model 
        }
    ],
    teachers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher" // nom de model 
        }
    ]
});
// affect model name to shema
const note = mongoose.model("Note", noteShema);
//make match importable
module.exports = note;