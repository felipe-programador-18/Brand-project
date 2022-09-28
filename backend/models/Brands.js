const mongoose = require("mongoose")
const {Schema} = mongoose;

const newBrand =  new Schema({
    name:String
},{
    timestamps: true
})

const Brand = mongoose.model("Brand", newBrand)
module.exports = Brand;