const mongoose = require("mongoose")
const {Schema} = mongoose;

const newBrand =  new Schema({
    name:String,
    userId: mongoose.ObjectId,
    userName: String
},{
    timestamps: true
})

const Brand = mongoose.model("Brand", newBrand)
module.exports = Brand;