const {model , Schema} = require("mongoose");
const portfolioMenu = new Schema({
  name:{
    type:String,
    required:true
  }
});
module.exports = model("PortfolioMenu" , portfolioMenu);