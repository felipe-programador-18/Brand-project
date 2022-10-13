const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { default: mongoose } = require("mongoose");
const jwtSecret = process.env.JWT_SECRET ;


const generationToken = (id) => {
   return jwt.sign({id}, 
    jwtSecret,{
        expiresIn:"7d"
    })
}

const register = async (req,res) => {
  const{name, email, password} = req.body;
  
  const user = await User.findOne({email})
  
  if(user){
    res
    .status(422)
    .json({errors:["Please you can use another email."]})
    return;
  }
  
  const salt = await bcrypt.genSalt()
  const generatePassword = await bcrypt.hash(password, salt)
 
   const CreateUser = await User.create({
    name,
    email,
    password: generatePassword
   })

   if(!CreateUser){
    res
    .status(422)
    .json({errors:["there was an error here you can try more later"]})
    return;
   }
  
    res.status(201).json({
    _id: CreateUser._id ,
     token: generationToken(CreateUser._id)  
    })
}

const loginControlled = async (req,res) => {
  const{email,password} = req.body;

  const user = await User.findOne({email})
  console.log("verify my user logged", user)
  
  if(!user){
    res
   .status(404)
   .json({errors:["User not found!"]})
    return;
  }
  
  if(!(await bcrypt.compare(password, user.password))){
   res
   .status(422)
   .json({errors:["key invalid!"]})
   return;
  }
  

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generationToken(user._id)
  })
  
}


// create function to get currently logged
const getCurrentUser= async (req,res) =>{
  const user = await req.user
  console.log("my currently user its here", user)
  res.status(200).json(user)

}

const updateUser = async (req, res) => {
 try {
  const {name,password,bio} = req.body;
  
   let profileImage = null;
   if(req.file){
     profileImage = req.file.filename
   }
   
   const reqUser = req.user
   const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")
   
   console.log("user backend here", user)
    

   if(name){
    user.name = name
   }

   if(password){
    const salt = await bcrypt.genSalt()
    const generatePassword = await bcrypt.hash(password, salt)
    user.password = generatePassword
   }

   if(profileImage){
    user.profileImage = profileImage
   }

   if(bio){
    user.bio = bio
   }

   await user.save()
   res.status(200).json(user)
  
  } catch (error) {
  console.log("exist something wrong here!!", err)
  }

}

module.exports = {
    register,
    loginControlled,
    getCurrentUser, 
    updateUser
}