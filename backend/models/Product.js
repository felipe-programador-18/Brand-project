const mongoose = require("mongoose")
const {Schema} = mongoose;

const AddProduct = new Schema({
   name: String,
   image: String,
   describe: String,
   price: Number,
   inventory: Number,
   category: String,
   brand:String,
   likes: Array,
   comments: Array,
   userId: mongoose.ObjectId,
   userName: String
},{
    timestamps: true
})


const Product = mongoose.model("Produto", AddProduct)
module.exports = Product;