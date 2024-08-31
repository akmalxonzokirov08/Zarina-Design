module.exports = function(req , res ,  next){
    if(!req.session.tizimkirildi){
        res.redirect("/login");
    }
    next();
}