require("dotenv").config()

const express = require("express")
const app = express()

const port = process.env.PORT ;

const path = require("path")
const cors = require("cors")


// set up to define receive all dates to back for frontend
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// now i have together it work with cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


// router here
const route = require("./Routes/route.js")
app.use(route)

app.listen(port, () => {
    console.log(`Port its working here ${port}`)
})
