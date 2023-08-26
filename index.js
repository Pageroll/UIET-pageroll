let express = require("express");
let path = require("path") ;
let mongoose = require("mongoose")
let app = express() ;
const ejs = require("ejs") ;
let methodoverride = require("method-override")
const bcrypt = require("bcrypt")
require("./db/conn.js")
app.use(express.json());
const static_path = path.join(__dirname,"/public") 
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
//app.set("view engine","ejs")
app.use(methodoverride('_method'))
const mongoUrl1 = 'mongodb://127.0.0.1:27017'; // Replace with your first MongoDB connection URL
require("./db/conn.js")
//const mongoUrl2 = 'mongodb://localhost:27017/db2'; // Replace with your second MongoDB connection URL
const UsernameRegister = require("./models/username.js")

app.use(express.static(__dirname));




app.set('view engine','ejs') ;
app.set(express.static('public')) ;

app.get('/', function(req, res) {
     UsernameRegister.find({})
     .then((a)=>{
        return res.render('index')
        
        
     })
     .catch((e)=>{
        console.log(e) ;
      })
    
  });
  app.get('/', function(req, res) {
    UsernameRegister.find({})
    .then((a)=>{
        res.json(a)
        console.log(a) ;
       
    })
    .catch((e)=>{
       console.log(e) ;
     })
   
 });
 app.get('/register',(req,res)=>{
    res.render('res.ejs')
 })
 app.post("/login",async(req,res)=>{
    try{
        const name = req.body.name;
        const password = req.body.password ;
        const username = await UsernameRegister.findOne({name:name})
        const isMatch =  bcrypt.compare(password,username.password)
        const token = await username.generateAuthToken() ; 
        res.cookie("jwt",token);
         console.log("token is " + token) ;
        if(isMatch){
            res.json({ mesaage: 'LOgin Successfull' });
        }
    }catch(e){
    console.log(e)
    }
 })

 app.post('/register',async(req,res)=>{
   try{ 
    let data= new UsernameRegister({ 
        name : req.body.username,
        password : req.body.password
    
    })
    console.log(data) ;
    const token = await data.generateAuthToken() ; 
   console.log("token is " + token) ;
   res.cookie("jwt",token);
 //  console.log(cookie)
   const register = await data.save()
        res.status(200).json(register);
}
    catch(e){ 
        console.log(e);
    }
})
app.listen(400,()=>{
    console.log("Port Working") ;
})