const ProductPhoto = require("../models/Product")
const User = require("../models/user")
const mongoose = require("mongoose")

//insertUser Picture
const InsertPhotoProduct = async(req,res) =>{
   const{ name } = req.body
   const{ image } = req.file.filename

    const reqUser =req.user
    const user = await User.findById(reqUser._id)
    console.log("Hi my user here!!!", user)

    const newProduct = await ProductPhoto.create({
        name,
        image,
        userId:user._id,
        userName: user.name 
    })
   
    if(!newProduct){
        res.status(422).json({errors:["not is possible adding photo, please try more later!"]})
        return
    }

    res.status(201).json(newProduct)
    
}


// functionality to deleted product!!!

const deletedProduct = async(req,res) => {

}

module.exports = {
    InsertPhotoProduct,
    deletedProduct
}