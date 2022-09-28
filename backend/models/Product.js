const mongoose = require("mongoose")
const {Schema} = mongoose;

const AddProduct = new Schema({
   name: String,
   describe: String,
   price: Number,
   inventory: Number,
   category: String,
   brand:String,
   userId: mongoose.ObjectId,
   userName: String
},{
    timestamps: true
})


const Product = mongoose.model("Produto", AddProduct)
module.exports = Product;