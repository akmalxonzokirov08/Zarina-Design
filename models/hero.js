const {model, Schema} = require("mongoose");
 const hero = new Schema({
    rasm:{ 
        type:String,
        required:true
    },
    sarlavha:{
        type:String,
        required:true
    },
    izoh:{
        type:String,
        required:true
    },
    tugmaNomi:{
        type:String,
        required:true
    },
    tugmaManzil:{
        type:String,
        required:true
    }
 });
module.exports = model("Hero" , hero);