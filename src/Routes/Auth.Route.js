const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')
const AuthController = require('../Controllers/AuthController')
const verifyToken = require('../Middleware/VerifyToken')
const {checkEmail, checkPassword, validation} = require('../Middleware/Validators')
// const validators = require('../Middleware/Validators')

router.post('/login', AuthController.Login)
router.post('/register', [checkEmail, checkPassword, validation], AuthController.Register)
// router.post('/register', [validators.checkEmail, validators.validation], AuthController.Register)

module.exports = router;