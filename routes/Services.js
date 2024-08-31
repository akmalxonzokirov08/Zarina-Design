const {Router} = require("express");
const router = Router();
const Services = require("../models/services");
const Footer = require("../models/footer");
router.get("/" , async(req , res)=>{
    const services = await Services.find();
    const footer = await Footer.find();
    res.render("services" , {title:"Xizmat turlari" , activeServices:true , layout:"main" , services , footer})
});

module.exports = router;