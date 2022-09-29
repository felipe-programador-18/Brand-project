const express = require("express")
const router = express.Router()

// controllers 
const {register, loginControlled} = require("../controllers/user")

//middleware
const validator = require("../middware/handlevalidator")
const {userValUser, login } = require("../middware/user.validation")


router.post("/register", userValUser(), validator ,register)
router.post("/login",login(),validator, loginControlled)




router.use("/api/users/register",register)
router.use("api/users/login", loginControlled)


//router.use("/api/users/categoryProduto")

module.exports = router;