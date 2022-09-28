const  {body} = require("express-validator")

const userValUser = () => {
    return [
        body("name")
        .isString()
        .withMessage("The name should be contained more than 5 letters.")
        .isLength({min:6}),

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
              throw new Error('A senhas não são iguais !!')
            }
            return true;
        })

    ]
}


module.exports = {
    userValUser
}