//import mongoose module
const mongoose = require('mongoose');
//create user shema
const userShema = mongoose.Schema({
    // attr: type
    
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    adress:String,
    pwd:String,
    specialité:String,
    role:String,
    status:String,
    avatar:String,
    cvpdf:String,
    telStudent:{
        type:mongoose.Schema.Types.ObjectId,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course" // nom de model 
        }
    ],
    absences:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Absence" // nom de model 
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
const user = mongoose.model("User", userShema);
//make match importable
module.exports = user;