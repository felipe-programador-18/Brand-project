const Product = require("../models/Product")
const User = require("../models/user")
const mongoose = require("mongoose")

//insertUser Picture
const InsertPhotoProduct = async(req,res) =>{
   const{ name,describe, price, inventory, category, brand } = req.body
   const image  = req.file.filename

    const reqUser =req.user
    const user = await User.findById(reqUser._id)
    console.log("Hi my user here!!!", user)

    const newProduct = await Product.create({
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
      const PhotoProduct = await Product.findById(mongoose.Types.ObjectId(id))
     
      if(!Product){
        res.status(404).json({errors:["picture not found."]})
        return;
      }
       
      if(!Product.userId.equals(ReqUser._id)){
        res.status(422).json({errors:["not is possible deleted picture, you can try more later!"]})
      return;
      }
      
      await Product.findByIdAndDelete(PhotoProduct._id)
      
      res.status(200).json({errors:["photo deleted with successfully!"]})

    }catch(err){  
        res.status(404).json({errors:["Happened issues it loading, you can try again more later!"]})
        return;
    }


}

const getAllUserProduct = async(req,res) => {
 const PhotoProduct = await Product.find({})
 .sort([["createdAt", -1]])
 .exec();
  res.status(200).json(PhotoProduct) 
}

const getUserPhoto = async(req,res) => {
  
  const {id} = req.params ;

  const PhotoProduct= await Product.find({userId: id})
  .sort([["createdAt", -1]])
  .exec()

  return res.status(200).json(PhotoProduct)
}

const getUserId = async(req,res) => {
 
  const {id} = req.params ;

  try {
    const PhotoProduct = await Product.findById(mongoose.Types.ObjectId(id)) 
     
    if(!PhotoProduct){
      res.status(401).json({errors:["photo not found"]})
      return
    }
    
    res.status(200).json(PhotoProduct)
  } catch (error) {
    res.status(422).json({errors:["Happened issues it loading, you can try again more later!"]})
  }

}

const UpdateProduct = async (req,res) => {
  
  const {id} = req.params;
  const{name} = req.body;
  
  const reqUser = req.user
  const PhotoProduct = await Product.findById(id)
  console.log("testing my product here", PhotoProduct )

  if(!PhotoProduct){
     res
     .status(404)
     .json({errors:["not found product!"]})
     return
    }
    
//check if product belong user!!
    if(!PhotoProduct.userId.equals(reqUser._id)){
      res
      .status(422)
      .json({errors:["Happened issues it loading, you can try again more later!"]})
    return;
    }

    if(name){
      PhotoProduct.name = name
    }
    await PhotoProduct.save()
    
    res.status(200).json({ PhotoProduct, message:"photo update with success" })
  
}

const LikeProduct = async (req,res) => {
    
   const{id} = req.params ;
   const reqUser = req.user;

   
   try {
     const PhotoProduct = await Product.findById(id) 
     
     if(!PhotoProduct){
      res.status(404).json({errors:["not found product photo"]})
      return
     }

     if(PhotoProduct.likes.includes(reqUser._id)){
      res.status(422).json({errors:[" you have clicked on the product already"]})
      return
     }

     PhotoProduct.likes.push(reqUser._id)
     PhotoProduct.save()
    
    
     res
     .status(200)
     .json({ productId:id, userId: reqUser._id, message:'The product was liked' })

  } catch (error) {
    res.status(422).json({errors:["Happened issues it loading, you can try again more later!"]})
    return
  }

}


const CommentsProduct = async(req,res) =>{
  const {id} = req.params ;
  const {comment} = req.body;
  
  const reqUser = req.user;
   
  const user = await  User.findById(reqUser._id)
  const ProductPhoto = await Product.findById(id)

  if(!ProductPhoto){
    res.status(404).json({errors:["Product not exist"]})
    return
  }
   

  const createComments = {
    comment,
    userName : user.name,
    userImage: user.profileImage,
    userId : user._id
  }
  
  ProductPhoto.comments.push(createComments)
  await ProductPhoto.save()

  res.status(200).json({})

}





module.exports = {
    InsertPhotoProduct,
    deletedProduct,
    getAllUserProduct,
    getUserPhoto,
    getUserId,
    UpdateProduct,
    LikeProduct,
    CommentsProduct
}