// validationMiddleware.js

const { check, validationResult} = require('express-validator');

// Validation rules for email, name, password, and confirm password fields
exports.validateUserSignUp = [
    check('email').isEmail().withMessage('Invalid email address'),
  
    check('name')
      .trim()
      .isString()
      .withMessage('Must be a valid name')
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters long'),
  
    check('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long'),
  
    check('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ];

//  exports.userValidation = (req, res, next)=>{
//     const result = validationResult(req).array();
//     console.log(result);

//     const error1 =result[0].msg;
//     const error2 =result[1].msg;
//     const error3 =result[2].msg;
//     res.json({succes: false, message1: error1, message2: error2, message3: error3});
//     if(!result.length) return next();

//     // const error =result[0].msg;
//     // res.json({succes: false, message: error});
//  }

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (result.length > 0) {
    const errorMessages = result.map((error) => error.msg);
    return res.json({ success: false, result: errorMessages });
  }
  next(); // Call next() to continue processing if there are no errors
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email/password is required!'),
  check('password').trim().not().isEmpty().withMessage('email/password is required!'),
]