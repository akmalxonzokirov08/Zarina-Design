const {model, Schema} = require("mongoose");
 const order = new Schema({
    ism:{
        type:String,
        required:true
    },
    manzil:{
        type:String,
        required:true
    },
    telefon:{ 
        type:String,
        required:true
    },
 });
module.exports = model("Order" , order);