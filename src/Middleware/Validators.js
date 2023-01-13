const { body, check, validationResult } = require('express-validator');
const User = require('../Models/User.model')



function emailExists(email) {
    return User.some(user => user.email === email);
  }

exports.checkEmail = [
    body('email').isEmail()
    .withMessage('Email incorrect format')
]
exports.checkPassword = [
    body('password').isLength({min: 8})
    .withMessage('Password must be at least 8 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
]
// 

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
