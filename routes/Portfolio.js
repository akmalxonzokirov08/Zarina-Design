const {Router} = require("express");
const router = Router();
const PortfolioMenu = require("../models/portfolioMenu");
const Portfolio = require("../models/portfolio");
const Footer = require("../models/footer");
const Services = require("../models/services");
router.get("/" , async(req , res)=>{
    const portfolioMenu = await PortfolioMenu.find();
    const portfolio = await Portfolio.find();
    const services = await Services.find();
    const footer = await Footer.find();
    res.render("portfolio" , {title:"Qilingan ishlar" , activePortfolio:true , layout:"main" , portfolio , portfolioMenu , services , footer})
});

module.exports = router;