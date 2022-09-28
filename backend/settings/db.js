const mongoose = require("mongoose")

const dbUser =process.env.DB_USER;
const dbPassword=process.env.DB_SENHA;

const conn = async() => {
    try {
       const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.iocelxe.mongodb.net/?retryWrites=true&w=majority`)
       console.log("Connected inside a database!!")
       return dbConn
    } catch (error) {
       console.log("ERROR IN CONNECTION",error) 
    }
}

conn()
module.exports = conn;