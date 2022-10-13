const User = require("../models/user")
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const AuthGuard = async(req,res, next) => {
   const authHeader= req.headers['authorization'] 
   const token = authHeader && authHeader.split(" ")[1]

   if(!token) return res.status(401).json({errors:["you do not have permission to access the products."]}) 
   
  try {
    const verified = await jwt.verify(token, jwtSecret);
     req.user = await User.findById(verified.id).select("-password") 
     next()
   } catch (error) {
     res.status(400).json({errors:["invalid token"]})
   }
}


module.exports = AuthGuard;