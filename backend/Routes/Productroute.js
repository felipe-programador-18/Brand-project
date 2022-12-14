const express = require("express")
const  router = express.Router()


//controllers
const {InsertPhotoProduct,
    deletedProduct, 
    getAllUserProduct,
    getUserPhoto,
    getUserId,
    UpdateProduct,
    LikeProduct,
    CommentsProduct,
    searchProduct
} = require("../controllers/ProductPhoto")


//middleware
const {photoInsertValidation,photoUpdateValidation, validateComments } = require("../middware/photoValidation")
const AuthGuard = require("../middware/authGuard")
const validator = require("../middware/handlevalidator")

const {updateImage} = require("../middware/imageUpload")

router.post("/" ,AuthGuard, 
updateImage.single("image"),
photoInsertValidation(),
validator,
InsertPhotoProduct)

router.delete("/:id", AuthGuard, deletedProduct)
router.get("/",AuthGuard, getAllUserProduct)
router.get("/user/:id" , AuthGuard, getUserPhoto)

router.get("/search",AuthGuard, searchProduct)

router.get("/:id", AuthGuard, getUserId)
router.put("/:id",AuthGuard,photoUpdateValidation(), validator, UpdateProduct)
router.put("/like/:id",AuthGuard, LikeProduct)

router.put("/comment/:id" ,AuthGuard, validateComments(), validator,CommentsProduct)



module.exports = router