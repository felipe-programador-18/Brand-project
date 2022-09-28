const express = require("express")
const route = express.Router()


// dont forget here i can add two router brand and user!!
route.use("/api/users", require("./User") )
route.use("/api/brand", require("./brand"))


route.get("/",(req,res) => {
    res.send("Api of product its working here now!!")
})


module.exports=route;