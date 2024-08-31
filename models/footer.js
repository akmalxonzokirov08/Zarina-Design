const {model, Schema} = require("mongoose");
 const footer = new Schema({
    saytNomi:{ 
        type:String,
        required:true
    },
    manzil:{
        type:String,
    },
    telefonRaqam:{
        type:String,
        required:true
    },
    emailKiriting:{
        type:String,
        required:true
    },
 });
module.exports = model("Footer" , footer);