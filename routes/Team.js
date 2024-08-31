const {Router} = require("express");
const router = Router();
const Team = require("../models/team");
const Services = require("../models/services");
const Footer = require("../models/footer");
router.get("/" , async(req , res)=>{
    const team = await Team.find();
    const services = await Services.find();
    const footer = await Footer.find();
    res.render("team" , {title:"Guruh azolari" , activeTeam:true , layout:"main" , team , services , footer})
});

module.exports = router;