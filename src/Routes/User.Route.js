const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')
const verifyToken = require('../Middleware/VerifyToken')
const verifyIsAdmin = require('../Middleware/VerifyisAdmin');

router.get('/test', UserController.Test)

router.get('/users', verifyToken, verifyIsAdmin, UserController.GetUsers)
// router.get('/user/:id', UserController.GetOneUser)
router.get('/user/:id', verifyToken, verifyIsAdmin, UserController.GetOneUser)
router.get('/user/', verifyToken, UserController.GetAuthUser)
router.put('/user/:id', UserController.EditUser)
router.put('/user/edit/me', verifyToken, UserController.EditMe)
// router.post('/auth/login', UserController.Login)
// router.post('/auth/register', UserController.Register)
router.delete('/users/:id', UserController.DeleteUser)



module.exports = router;