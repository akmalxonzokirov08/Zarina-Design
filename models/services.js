const {model, Schema} = require("mongoose");
 const services = new Schema({
    ikonka:{ 
        type:String,
        required:true
    },
    // rang:{
    //     type:String,
    //     required:true
    // },
    xizmatTuri:{
        type:String,
        required:true
    },
    malumot:{
        type:String,
        required:true
    },
    
 });

module.exports = model("Services" , services);