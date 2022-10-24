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
        }),

        body("describe")
        .not()
        .equals("undefined")
        .withMessage("The product need to a description")
        .isString()
        .isLength({min:10})
        .withMessage("the description of product should be more than 10 letter"),

        body("price")
        .not()
        .equals("undefined")
        .withMessage("You need to add price in your product")
        .isNumeric()
        .withMessage("You need to add just number.")
        
    ]
}


module.exports = {
    photoInsertValidation
}