const {model, Schema} = require("mongoose");
 const portfolio = new Schema({
    rasm:{ 
        type:String,
        required:true
    },
    pardaNomi:{
        type:String,
        required:true
    },
    mentor:{
        type:Schema.Types.ObjectId,
        ref:"PortfolioMenu",
        required:true
    }
 });
module.exports = model("Portfolio" , portfolio);    