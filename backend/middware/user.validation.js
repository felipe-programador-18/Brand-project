const  { body } = require("express-validator")

const userValUser = () => {
    return [body("name")
        .isString()
        .withMessage("The name should be contained more than 5 letters.")
        .isLength({min:6})
        .withMessage("your name needs to have more than 5 letters."),

        body("email")
        .isString()
        .withMessage("The email is obligatory")
        .isEmail()
        .withMessage("Please insert a valid email."),

        body("password")
        .isString()
        .withMessage("The password is obligatory.")
        .isLength({min:8})
        .withMessage("Your key should be more than 7 letters or numbers."),

        body("confirmPassword")
        .isString()
        .withMessage("The confirmation of your email is obligatory.")
        .custom((value,{req}) => {
            if(value != req.body.password){
              throw new Error('the keys not are equals !')
            }
            return true;
        })

    ]
}

const login = () => {
   return [
    body("email")
    .isString()
    .withMessage("Please fill this field with your email!!")
    .isEmail()
    .withMessage("Please insert a valid email."),

    body("password")
    .isString()
    .withMessage("Please your key is obligatory.")   
   ]
}


const userUpdateValidation = () => {
    return [
     body("name")
     .optional()
     .isLength({min:6})
     .withMessage("The name should be contained more than 5 letters."),
     
     body("password")
     .optional()
     .isLength({min:8})
     .withMessage("Your key should be more than 7 letters or numbers.")
    ]
 }
 



module.exports = {
    userValUser,
    login,
    userUpdateValidation
}