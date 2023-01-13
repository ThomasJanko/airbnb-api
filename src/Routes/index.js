const express = require('express');
const router = express.Router();
const UserRouter = require('./User.Route')
const AuthRouter = require('./Auth.Route')
const PlaceRouter = require('./Place.Route')


router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/place', PlaceRouter);

module.exports = router;