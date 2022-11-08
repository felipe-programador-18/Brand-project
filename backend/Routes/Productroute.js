const express = require("express")
const  router = express.Router()


//controllers
const {InsertPhotoProduct,
    deletedProduct, 
    getAllUserProduct,
    getUserPhoto,
    getUserId,
    UpdateProduct
} = require("../controllers/ProductPhoto")


//middleware
const {photoInsertValidation,photoUpdateValidation } = require("../middware/photoValidation")
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


router.get("/:id", AuthGuard, getUserId)
router.put("/:id",AuthGuard,photoUpdateValidation(), validator, UpdateProduct)

module.exports = router