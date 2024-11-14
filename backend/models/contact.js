//import mongoose module
const mongoose = require('mongoose');
//create user shema
const contactShema = mongoose.Schema({
    // attr: type
    
    name:String,
    email:String,
    subject:String,
    message:String
});
// affect model name to shema
const contact = mongoose.model("Contact", contactShema);
//make match importable
module.exports = contact;