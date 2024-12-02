//import mongoose module
const mongoose = require('mongoose');
//create event shema
const eventShema = mongoose.Schema({
    // attr: type
    
    date: String,
    place:String,
    name: String,
    description: String,
    avatar:String,
   
});
// affect model name to shema
const event = mongoose.model("Event", eventShema);
//make match importable
module.exports = event;