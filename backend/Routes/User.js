const express = require("express")
const router = express.Router()

// controllers 
const {register,
    loginControlled,
    getCurrentUser,
    updateUser} = require("../controllers/user")

//middleware
const validator = require("../middware/handlevalidator")
const {userValUser, 
    login,
    userUpdateValidation  } = require("../middware/user.validation")

const AuthGuard = require("../middware/authGuard")
const {updateImage} = require("../middware/imageUpload")



router.post("/register", userValUser(), validator ,register)
router.post("/login",login(),validator, loginControlled)

router.put("/", AuthGuard, userUpdateValidation(),validator,updateImage.single("profileImage"),updateUser)

router.get("/profile", AuthGuard,getCurrentUser )
router.get("/:id", )







router.use("/api/users/register",register)
router.use("api/users/login", loginControlled)


//router.use("/api/users/categoryProduto")

module.exports = router;