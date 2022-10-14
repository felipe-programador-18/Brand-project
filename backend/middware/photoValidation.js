const {body} = require("express-validator")


//create all structure to validate a photo!

const photoInsertValidation = () => {
    return [
        body("name")
        .not()
        .equals("undefined")
        .withMessage("the name is mandatory")
        .isString()
        .withMessage("the name is mandatory")
        .isLength({min:6})
        .withMessage("The name of product should more than 5 letters"),

        body("image").custom((value, {req} ) => {
            if(!req.file){
                throw new Error("The picture is mandatory")            
            }
            return true;
        })
    ]
}


module.exports = {
    photoInsertValidation
}