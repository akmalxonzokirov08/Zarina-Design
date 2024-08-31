const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const dotEnv = require("dotenv");
dotEnv.config();
const path = require("path");
const flash = require("connect-flash")
const URL = process.env.URl
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const session = require("express-session");
const fs = require("fs");
const mbSession = require("connect-mongodb-session")(session);
const PORT = process.env.PORT;
async function start(){
    try {
        await mongoose.connect(URL);
        app.listen(PORT , (req , res)=>{
            console.log(`Server ${PORT} portda ishladi`)
        });
    } catch (error) {
        console.log(error);
    }
}
start();

const exphbs = require("express-handlebars");
const hbs = exphbs.create({
    defaultLayout:"main",
    extname:"hbs",
    handlebars:allowInsecurePrototypeAccess(Handlebars),
    helpers:{
        incr:function(index){return index+1;}
    }
});
const store = new mbSession({
    collection: 'sessions',
    uri:URL
});
app.use(session({
    secret: 'maxfiy kalit',
    resave: false,
    saveUninitialized:false,
    store
}));
const bodyParser = require("body-parser")
app.engine("hbs" , hbs.engine);
app.set("view engine" , "hbs");
app.set("views" , "page");
app.use(express.static("public"));
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/images" , express.static(path.join(__dirname , "images")));
app.use('/admin/register', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/hero', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/about', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/services', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/portfolioMenu', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/portfolio', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/team', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/footer', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/order', express.static(path.join(__dirname,"public","admin")));

app.use("/admin" , require("./routes/Admin"));
app.use('/login' , require('./routes/Login'));  
app.use("/" , require("./routes/Home"));
app.use("/about" , require("./routes/About"));
app.use("/contact" , require("./routes/Contact"));
app.use("/order" , require("./routes/Order"));
app.use("/portfolio" , require("./routes/Portfolio")); 
app.use("/pricing" , require("./routes/Pricing"));
app.use("/services" , require("./routes/Services"));
app.use("/team" , require("./routes/Team"));
app.use("/testimonials" , require("./routes/Testimonials"))



app.use(async(req , res)=>{
    res.status(404).render("notfound" , {title:"Sahifa topilmadi"});
});
