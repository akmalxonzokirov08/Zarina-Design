const {Router} = require('express');
const router = Router()
const User = require("../models/user");
const Services = require("../models/services");
const Footer = require("../models/footer");
router.get('/' , async(req , res)=>{
    const services = await Services.find();
    const footer = await Footer.find();
    const error = req.flash("error")
    const success = req.flash("success")
    res.render('login' , {error , success , services , footer}  )
})
router.post("/" , async(req , res)=>{
    try {
        const {login , parol} = req.body;
        const bazaUser = await User.findOne({login});
        if(bazaUser){
            if(await bazaUser.paroltekshirish(parol)){
                req.session.user = bazaUser;
                req.session.tizimkirildi = true;
                req.session.save((err)=>{
                    if(err) throw err;
                    res.redirect("/admin");
                });
                
            }
            else{
                console.log("parol xato");
                req.flash("error" , "Parol xato")
                res.redirect("/login");
            }
        }
        else{
            console.log("Foydalanuvchi topilmadi");
            req.flash("error" , "Foydalanuvchi topilmadi")
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error)
    }
});





module.exports = router;

