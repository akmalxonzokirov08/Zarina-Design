const {model, Schema} = require("mongoose");
 const about = new Schema({
    sarlavha:{
        type:String,
        required:true
    },
    izoh:{
        type:String,
        required:true
    },
    izoh1:{ 
        type:String,
        required:true
    },
    izoh2:{
        type:String,
        required:true
    },
    izoh3:{
        type:String,
        required:true
    },
    izoh4:{
        type:String,
        required:true
    },
    izoh5:{
        type:String,
        required:true
    }
 });
module.exports = model("About" , about);