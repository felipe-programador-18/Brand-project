const multer = require("multer")
const path = require("path")


const imageStory = multer.diskStorage({
    destination: (req, file, cb) => {   
     let folder=""
        
     if(req.baseUrl.includes("users")){
       folder ="users"
     }else if(req.baseUrl.includes("produtos")){
      folder ="produtos" 
     }
     
     // this structure its works for save picture
     cb(null, `uploads/${folder}/`)
      
    },
// this structure generate date and generate new name of file !!
    filename: (req,file, cb) =>{
     cb(null, Date.now() + path.extname(file.originalname))
    }
})

const updateImage = multer({
    storage: imageStory,
    fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(png|jpg)$/)){
      
        //upload of jpg and png file
            
        return cb( new Error("Por favor envie apenas fotos, jpg ou png!") )
        }
     cb(undefined, true)

    }
})



module.exports ={
 updateImage
}