const express = require("express")
const router = express.Router()

// controllers 
const {register, loginControlled, getUserId } = require("../controllers/user")

//middleware
const validator = require("../middware/handlevalidator")
const {userValUser, login } = require("../middware/user.validation")

const authGuard = require("../middware/authGuard")



router.post("/register", userValUser(), validator ,register)
router.post("/login",login(),validator, loginControlled)


router.get("/profile", authGuard,getUserId )

router.use("/api/users/register",register)
router.use("api/users/login", loginControlled)


//router.use("/api/users/categoryProduto")

module.exports = router;