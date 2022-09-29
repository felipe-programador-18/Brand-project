const express = require("express")
const router = express.Router()

// controllers 
const {register} = require("../controllers/user")

//middleware
const {userValUser } = require("../middware/user.validation")


router.post("/register", userValUser() ,register)
router.post("/login")




router.use("/api/users/register",register)
//router.use("/api/users/categoryProduto")

module.exports = router;