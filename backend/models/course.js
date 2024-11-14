//import mongoose module
const mongoose = require('mongoose');
const absence = require('./absence');
//create course shema
const courseShema = mongoose.Schema({
    // attr: type
    
    date: String,
    prix:String,
    name: String,
    description: String,
    avatar:String,
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" // nom de model 
        }
    ],
    
    notes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Note" // nom de model 
        }
    ]
});
// affect model name to shema
const course = mongoose.model("Course", courseShema);
//make match importable
module.exports = course;