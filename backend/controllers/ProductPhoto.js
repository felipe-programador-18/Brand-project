const ProductPhoto = require("../models/Product")
const User = require("../models/user")
const mongoose = require("mongoose")

//insertUser Picture
const InsertPhotoProduct = async(req,res) =>{
   const{ name,describe, price, inventory, category, brand } = req.body
   const{ image } = req.file.filename

    const reqUser =req.user
    const user = await User.findById(reqUser._id)
    console.log("Hi my user here!!!", user)

    const newProduct = await ProductPhoto.create({
        name,
        describe,
        price,
        inventory,
        category,
        brand,
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
 
    const {id} = req.params;
    const ReqUser = req.user ;
    console.log("my req user  here", ReqUser)
     
    try{
      const PhotoProduct = await ProductPhoto.findById(mongoose.Types.ObjectId(id))
     
      if(!PhotoProduct){
        res.status(404).json({errors:["picture not found."]})
        return;
      }
       
      if(!PhotoProduct.userId.equals(ReqUser._id)){
        res.status(422).json({errors:["not is possible deleted picture, you can try more later!"]})
      return;
      }
      
      await ProductPhoto.findByIdAndDelete(PhotoProduct._id)
      
      res.status(200).json({errors:["photo deleted with successfully!"]})

    }catch(err){  
        res.status(404).json({errors:["Happened issues it loading, you can try again more later!"]})
        return;
    }


}

const getAllUserProduct = async(req,res) => {
 const photos = await ProductPhoto.find({})
 .sort([["createdAt", -1]])
 .exec();
  res.status(200).json(photos) 
}

const getUserPhoto = async(req,res) => {
  
  const {id} = req.params ;

  const photos = await ProductPhoto.find({userId: id})
  .sort([["createdAt", -1]])
  .exec()

  return res.status(200).json(photos)
}

const getUserId = async(req,res) => {
 
  const {id} = req.params ;

  try {
    const photo = ProductPhoto.findById(mongoose.Types.ObjectId(id)) 
     
    if(!photo){
      res.status(401).json({errors:["photo not found"]})
      return
    }
    
    return  res.status(200).json(photo)
  } catch (error) {
    res.status(422).json({errors:["Happened issues it loading, you can try again more later!"]})
  }

}

module.exports = {
    InsertPhotoProduct,
    deletedProduct,
    getAllUserProduct,
    getUserPhoto,
    getUserId
}