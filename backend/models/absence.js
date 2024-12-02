//import mongoose module
const mongoose = require('mongoose');
//create user shema
const absenceShema = mongoose.Schema({
    // attr: type
    
    date:Date,
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
const absence = mongoose.model("Absence", absenceShema);
//make match importable
module.exports = absence;