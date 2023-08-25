const mongoose = require("mongoose")
bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken")
 const usernnameSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
 })
  usernnameSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({id:this._id},"mynameisHarshpeet")
        this.tokens  = this.tokens.concat({token:thapa})
        console.log(token)
        return token ;
    }
    catch{
         res.send("error  "+error);
         console.log("error "+error);
    }
  }
 
 usernnameSchema.pre("save",async function(next){
   // const passwordHash = await bcrypt.hash(this.password,10)
    this.password = await bcrypt.hash(this.password,10)
    console.log(this.password) ;
    next();
 })
 const UsernameRegister = new mongoose.model("UsernameRegister",usernnameSchema);
 module.exports = UsernameRegister ;