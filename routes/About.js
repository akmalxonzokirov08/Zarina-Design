const {Router} = require("express");
const router = Router();
const About = require("../models/about");
const Services = require("../models/services");
const Footer = require("../models/footer");
router.get("/" , async(req , res)=>{
    const about = await About.find();
    const services = await Services.find();
    const footer = await Footer.find();
    res.render("about" , {title: "Biz haqimizda" , activeAbout:true , layout:"main" , about , services , footer});
});

module.exports = router;