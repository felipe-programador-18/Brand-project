const {validationResult} = require("express-validator")


// this code serve to validate all register or login!
const validator = (req, res , next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const extractederror = []
    errors.array().map((err) => extractederror.push(err.msg))
    
    return res.status(422).json({
        errors : extractederror
    })  
}


module.exports = validator;