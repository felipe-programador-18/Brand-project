const express = require("express")
const  router = express.Router()


//controllers
const {InsertPhotoProduct,
    deletedProduct, getAllUserProduct} = require("../controllers/ProductPhoto")


//middleware
const {photoInsertValidation} = require("../middware/photoValidation")
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


module.exports = router