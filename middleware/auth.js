const jwt = require("jsonwebtoken") ;
const UsernameRegister = require("../models/username.js")

const auth = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token,"mynameisHarshpeet")
        console.log(verifyUser) ;
        const user =await UsernameRegister.findOne({_id:verifyUser._id })
        console.log(user)
        next() ;
    } catch (error) {
        res.status(401).send(error) ;
    }

}
module.exports = auth ; 