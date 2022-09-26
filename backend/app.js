
const express = require("express.js")
const app = express()

const path = require("path")
const cors = require("cors")

// set up to define receive all dates to back for frontend
app.use(express.join())
app.use(express.urlencoded({extended:false}))

// now i have together it work with cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))