const express = require('express');
const router = express.Router();
const UserRouter = require('./User.Route')
const AuthRouter = require('./Auth.Route')


router.use('/user', UserRouter);
router.use('/auth', AuthRouter );

module.exports = router;