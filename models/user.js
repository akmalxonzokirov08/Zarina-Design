const { Schema , model} = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
    login:{
        type:String,
        required:true,
        unique:true,
    },
    parol:{
        type:String,
        required:true
    }
})
userSchema.methods.paroltekshirish = async function(parol){
    return await bcrypt.compare(parol , this.parol);
}
module.exports = model('User' , userSchema)