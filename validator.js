const { body, validationResult } = require('express-validator')

const validationRules = () => {

     //setting a list of rules for the user
    return[
        body('email').isEmail().withMessage('Email must be a valid email address'), //username needs to be an email
        body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long')  //paswword has to be 5 chars atleast
    ] 

   
    
}

const validate = ((req,res, next) => {
    console.log('Validating request body:', req.body);
    const errors = validationResult(req)

    console.log(errors)

    if(errors.isEmpty()){
        console.log('Validation passed');
        return next()
    }

    const collectedErrors = []

    errors.array().map(err => collectedErrors.push({[err.path]:err.msg}))

    console.log('Validation errors:', collectedErrors);

    return res.status(422).json({
        errors: collectedErrors,
    })
})

module.exports = {validate, validationRules}