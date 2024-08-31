const {Router} = require("express");
const router = Router();
const Hero = require("../models/hero");
const About = require("../models/about");
const Services = require("../models/services");
const PortfolioMenu = require("../models/portfolioMenu");
const Portfolio = require("../models/portfolio");
const Team = require("../models/team");
const Order = require("../models/order");
const Footer = require("../models/footer");
router.get("/" , async(req , res)=>{
    try {
        const hero = await Hero.find();
        const about = await About.find();
        const services = await Services.find();
        const footer = await Footer.find();
        const portfolioMenu = await PortfolioMenu.find();
        const portfolio = await Portfolio.find();
        const team = await Team.find();
        res.render("index" , {title: "Bosh sahifa " , activeHome:true , hero , about ,services , portfolio , portfolioMenu, team , footer});
    } catch (error) {
        console.log(error); 
    };
});
// Order start
  router.post("/order/add" , async (req, res) => {
    try {
      const order = new Order({
        ism: req.body.ism,
        manzil: req.body.manzil,
        telefon: req.body.telefon,
      });
      await order.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  });
  router.post("/order/delete" , async(req , res)=>{
    try {
        await Order.findOneAndDelete(req.body.id);
        res.redirect("/admin/order");
    } catch (error) {
        console.log(error);
    }
  });
  // Order end
  
module.exports = router;