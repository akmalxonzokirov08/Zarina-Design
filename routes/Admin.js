const { Router, response } = require("express");
const router = Router();
const verification = require("../middlewear/verification");
const bcrypt = require('bcrypt')
const User = require("../models/user");
const Hero = require("../models/hero");
const About = require("../models/about");
const Services = require("../models/services");
const PortfolioMenu = require("../models/portfolioMenu");
const Portfolio = require("../models/portfolio");
const Team = require("../models/team");
const Order = require("../models/order");
const Footer = require('../models/footer')
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const fileHero = require("../middlewear/fileHero");
const filePortfolio = require("../middlewear/filePortfolio");
const fileTeam = require("../middlewear/fileTeam");
const { promises } = require("dns");
const { error, log } = require("console");
const { OrderedBulkOperation } = require("mongodb");
router.get("/", verification, (req, res) => {
  res.render("admin", { layout: "admin" });
});

//  User start
router.get("/register" , verification ,  async (req, res) => {
  const error = req.flash("error");
  const success = req.flash("success");
  try {
    const foy = await User.find();
    const user = foy.sort((a, b) => a.login.localeCompare(b.login));
    console.log(user);
    res.render("adminAdd/adminRegister", {layout: "admin",error,success,user,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/register/add", verification ,   async (req, res) => {
  try {
    const { login, parol } = req.body;
    const alreadyUser = await User.findOne({ login });
    if (alreadyUser) {
      req.flash("error", "Bunday foydalanuvchi mavjud");
      res.redirect("/admin/register");
    } else {
      const hashPassword = await bcrypt.hash(parol, 10);
      const user = new User({
        login: login,
        parol: hashPassword,
      });
      await user.save();

      // res.redirect("/admin/register?success=Foydalanuvchi qushildi")
      // res.render("adminAdd/adminRegister", {layout:"admin" , success:"Foydalanuvchi qo'shildi"})
      // res.render('/admin/register', {error:'Foydalanuvchi mavjud'} )
      req.flash("success", "Muvaffaqiyatli qo'shildi");
      res.redirect("/admin/register");
    }
  } catch (error) {}
});
router.get("/register/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("adminAdd/adminRegisterEdit", { layout: "admin", user });
  } catch (error) {
    console.log(error);
  }
});
router.post("/register/edit", async (req, res) => {
  try {
    const { parol, id } = req.body;
    if (parol == "") {
      req.flash("error", "Parolda o'zgarish bo'lmadi");
      res.redirect("/admin/register");
    } else {
      const hashPassword = await bcrypt.hash(parol, 10);
      req.body.parol = hashPassword;
      await User.findByIdAndUpdate(id, req.body);
      req.flash("success", "Parol o'zgartirildi");
      res.redirect("/admin/register");
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/register/delete", verification , async (req, res) => {
  try {
    if (req.session.user._id == req.body.id) {
      req.flash("error", "O'chirib bo'lmaydi");
      res.redirect("/admin/register");
    } else {
      await User.findByIdAndDelete(req.body.id);
      req.flash("success", "Foydalanuvchi o'chirildi");
      res.redirect("/admin/register");
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", verification, async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
});
// User end

// Hero start
router.get("/hero", verification , async (req, res) => {
  try {
    const hero = await Hero.find();
    res.render("adminAdd/adminHero", { layout: "admin", hero });
  } catch (error) {
    console.log(error);
  }
});
router.post("/hero/add" , verification ,  fileHero, async (req, res) => {
  try {  
    const hero = new Hero({
      rasm: req.file.filename,
      sarlavha: req.body.sarlavha,
      izoh: req.body.izoh,
      tugmaNomi: req.body.tugmaNomi,
      tugmaManzil: req.body.tugmaManzil,
    });
    await hero.save();
    res.redirect("/admin/hero");
  } catch (error) {
    console.log(error);
  }
});
router.get("/hero/:id", verification , async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    res.render("adminAdd/adminHeroEdit", { layout: "admin", hero });
  } catch (error) {
    console.log(error);
  }
});
router.post("/hero/delete", verification ,  async (req, res) => {
  try {
    await Hero.findOneAndDelete(req.body.id);
    res.redirect("/admin/hero");
  } catch (error) {
    console.log(error);
  }
});
router.post("/hero/edit", verification , fileHero, async (req, res) => {
  try {
    if (req.file) {
      const oldImg = path.join(__dirname, "../images/hero", req.body.oldImg);
      fs.unlink(`${oldImg}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      req.body.rasm = req.file.filename;
    }
    await Hero.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/hero");
  } catch (error) {
    console.log(error);
  }
});
// Hero end

// About start
router.get("/about", verification , async (req, res) => {
  try {
    const about = await About.find();
    res.render("adminAdd/adminAbout", { layout: "admin", about });
  } catch (error) {
    console.log(error);
  }
});
router.post("/about/add", verification , async (req, res) => {
  try {
    const about = new About({
      sarlavha: req.body.sarlavha,
      izoh: req.body.izoh,
      izoh1: req.body.izoh1,
      izoh2: req.body.izoh2,
      izoh3: req.body.izoh3,
      izoh4: req.body.izoh4,
      izoh5: req.body.izoh5,
    });
    // console.log(req.body)
    await about.save();
    res.redirect("/admin/about");
  } catch (error) {
    console.log(error);
  }
});
router.get("/about/:id", verification , async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    res.render("adminAdd/adminAboutEdit", { layout: "admin", about });
  } catch (error) {
    console.log(error);
  }
});
router.post("/about/delete", verification , async (req, res) => {
  try {
    await About.findOneAndDelete(req.body.id);
    res.redirect("/admin/about");
  } catch (error) {
    console.log(error);
  }
});
router.post("/about/edit", verification , async (req, res) => {
  try {
    await About.findByIdAndUpdate(req.body.id, req.body);
    // console.log(req.body)
    res.redirect("/admin/about");
  } catch (error) {
    console.log(error);
  }
});
//  About end

// Services start
router.get("/services", verification , async (req, res) => {
  try {
    const fayl = path.join(__dirname,"../","public", "assets","vendor","remixicon","remixicon.glyph.json");
    const services = await Services.find();
    const data = await fs.readFile(fayl, "utf-8");
    const ob = JSON.parse(data);
    const icon_name = Object.keys(ob);
    res.render("adminAdd/adminServices", {layout: "admin", ikonka_nomi: icon_name,  services,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/services/add", verification , async (req, res) => {
  try {
    const services = new Services({
      ikonka: req.body.ikonka,
      // rang: req.body.rang,
      xizmatTuri: req.body.xizmatTuri,
      malumot: req.body.malumot,
    });
    await services.save();
    // console.log(services)
    res.redirect("/admin/services");
  } catch (error) {
    console.log(error);
  }
});
router.get("/services/:id", verification , async (req, res) => {
  try {
    const services = await Services.findById(req.params.id);
    res.render("adminAdd/adminServicesEdit", { layout: "admin", services });
  } catch (error) {
    console.log(error);
  }
});

router.post("/services/delete", verification , async (req, res) => {
  try {
    await Services.findOneAndDelete(req.body.id);
    res.redirect("/admin/services");
  } catch (error) {
    console.log(error);
  }
});

router.post("/services/edit", verification , async (req, res) => {
  try {
    await Services.findByIdAndUpdate(req.body.id, req.body);
    // console.log(req.body)
    res.redirect("/admin/services");
  } catch (error) {
    console.log(error);
  }
});
// Services end

// Portfolio Menu start
router.get("/portfolioMenu", verification , async (req, res) => {
  try {
    const portfolioMenu = await PortfolioMenu.find();
    res.render("adminAdd/adminPortfolioMenu", { layout: "admin", portfolioMenu });
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolioMenu/add", verification , async (req, res) => {
  try {
    const portfolioMenu = new PortfolioMenu({
      name:req.body.name,
    });
    await portfolioMenu.save();
    res.redirect("/admin/portfolioMenu");
  } catch (error) {
    console.log(error);
  }
});
router.get("/portfolioMenu/:id", verification , async (req, res) => {
  try {
    const portfolioMenu = await PortfolioMenu.findById(req.params.id);
    res.render("adminAdd/adminPortfolioMenuEdit", { layout: "admin", portfolioMenu });
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolioMenu/delete", verification , async (req, res) => {
  try {
    await PortfolioMenu.findOneAndDelete(req.body.id);
    res.redirect("/admin/portfolioMenu");
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolioMenu/edit" , verification , async(req ,res)=>{
  try {
      await PortfolioMenu.findByIdAndUpdate(req.body.id , req.body);
      // console.log(req.body)
  res.redirect("/admin/portfolioMenu");
  } catch (error){
      console.log(error)
  }
})
// Portfolio Menu end

// Portfolio start
router.get("/portfolio", verification , async (req, res) => {
  try {
    const portfolio = await Portfolio.find().populate('mentor');
    const portfolioMenu = await PortfolioMenu.find()
    // console.log(portfolio)
    res.render("adminAdd/adminPortfolio", { layout: "admin", portfolio , portfolioMenu});
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolio/add", verification , filePortfolio, async (req, res) => {
  try {
    const portfolio = new Portfolio({
      rasm: req.file.filename,
      pardaNomi: req.body.pardaNomi,
      mentor:req.body.mentor
    });
    await portfolio.save();
    res.redirect("/admin/portfolio");
  } catch (error) {
    console.log(error);
  }
});
router.get("/portfolio/:id", verification , async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    res.render("adminAdd/adminPortfolioEdit", { layout: "admin", portfolio });
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolio/delete", verification , async (req, res) => {
  try {
    await Portfolio.findOneAndDelete(req.body.id);
    res.redirect("/admin/portfolio");
  } catch (error) {
    console.log(error);
  }
});
router.post("/portfolio/edit" , verification , filePortfolio , async(req , res)=>{
  try {
      if(req.file){
          const oldImg = path.join(__dirname, "../images/portfolio", req.body.oldImg);
          fs.unlink(`${oldImg}` , (err)=>{
              if(err){
                  console.error(err);
              }
          });
          req.body.rasm = req.file.filename
      };
      await Portfolio.findByIdAndUpdate(req.body.id , req.body);
      res.redirect("/admin/portfolio");
  } catch (error) {
      console.log(error);
  }
});
// Portfolio end

// Team start
router.get("/team", verification , async (req, res) =>{
  try {
    const team = await Team.find();
    res.render("adminAdd/adminTeam", { layout: "admin", team });
  } catch (error) {
    console.log(error);
  }
});
router.post("/team/add", verification , fileTeam, async (req, res) => {
  try {
    const team = new Team({
      rasm: req.file.filename,
      ism: req.body.ism,
      kasbi: req.body.kasbi,
      izoh: req.body.izoh
    });
    await team.save();
    res.redirect("/admin/team");
  } catch (error) {
    console.log(error);
  }
});
router.get("/team/:id", verification , async (req, res) =>{
  try {
    const team = await Team.findById(req.params.id);
    res.render("adminAdd/adminTeamEdit", { layout: "admin", team });
  } catch (error) {
    console.log(error);
  }
});
router.post("/team/delete", verification , async (req, res) =>{
  try {
    await Team.findOneAndDelete(req.body.id);
    res.redirect("/admin/team");
  } catch (error) {
    console.log(error);
  }
});
router.post("/team/edit" , verification , fileTeam , async(req , res)=>{
  try {
      if(req.file){
          const oldImg = path.join(__dirname, "../images/team", req.body.oldImg);
          fs.unlink(`${oldImg}` , (err)=>{
              if(err){
                  console.error(err);
              }
          });
          req.body.rasm = req.file.filename
      };
      await Portfolio.findByIdAndUpdate(req.body.id , req.body);
      res.redirect("/admin/team");
  } catch (error) {
      console.log(error);
  }
});
// Team end
// Order start
router.get("/order", verification , async (req, res) =>{
  try {
    const order = await Order.find();
    // console.log(order)
    res.render("adminAdd/adminOrder", { layout: "admin", order });
  } catch (error) {
    console.log(error);
  }
});
router.post("/order/add", verification , async (req, res) => {
  try {
    const order = new Order({
      ism: req.body.ism,
      manzil: req.body.manzil,
      telefon: req.body.telefon,
    });
    await order.save();
    res.redirect("/admin/order");
  } catch (error) {
    console.log(error);
  }
});
router.post("/order/delete" , verification , async(req , res)=>{
  try {
      await Order.findOneAndDelete(req.body.id);
      res.redirect("/admin/order");
  } catch (error) {
      console.log(error);
  }
});
// Order end

// Foter start
router.get("/footer" ,  verification , async(req , res)=>{
  try {
      const footer = await Footer.find();
      res.render("adminAdd/adminFooter" , {layout:"admin" , footer});
  } catch (error) {
      console.log(error)
  }
});
router.post("/footer/add" , verification , async(req , res)=>{
  try {
    const footer = new Footer({
      saytNomi:req.body.saytNomi,
      manzil:req.body.manzil,
      telefonRaqam:req.body.telefonRaqam,
      emailKiriting:req.body.emailKiriting      
    });
    await footer.save();
        res.redirect("/admin/footer");
  } catch (error) {
    console.log(error)
  }

});
router.get("/footer/:id" , verification , async (req , res)=>{
    try {
        const footer = await Footer.findById(req.params.id);
        res.render("adminAdd/adminFooterEdit" , {layout: "admin" , footer} )
    } catch (error) {
        console.log(error);
    }
});
router.post("/footer/delete" , verification , async(req , res)=>{
    try {
        await Footer.findOneAndDelete(req.body.id);
        res.redirect("/admin/footer");
    } catch (error) {
        console.log(error);
    }
});
router.post("/footer/edit" , verification , async(req ,res)=>{
  try {
      await Footer.findByIdAndUpdate(req.body.id , req.body);
      // console.log(req.body)
  res.redirect("/admin/footer");
  } catch (error){
      console.log(error)
  }
}) 
// Footer end
module.exports = router;
