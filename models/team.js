const {model, Schema} = require("mongoose");
 const team = new Schema({
    rasm:{ 
        type:String,
        required:true
    },
    ism:{
        type:String,
        required:true
    },
    kasbi:{
        type:String,
        required:true
    },
    izoh:{
        type:String,
        required:true
    }
 });
module.exports = model("Team" ,team);