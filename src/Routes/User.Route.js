const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.get('/test', UserController.Test)

router.get('/users', UserController.GetUsers)
router.get('/user/:id', UserController.GetOneUser)
router.put('/user/:id', UserController.EditUser)
router.post('/auth/login', UserController.Login)
router.post('/auth/register', UserController.Register)
router.delete('/users/:id', UserController.DeleteUser)

module.exports = router;