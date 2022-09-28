const mongoose = require("mongoose")
const {Schema} = mongoose ;

const CategoriesProduct =  new Schema({
    name: String,
    describe: String,
    userId: mongoose.ObjectId,
    userName: String,
}, {
    timestamps: true
})

const Category = mongoose.model("Category", CategoriesProduct)

module.exports = Category