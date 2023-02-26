const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/VerifyToken')
const ReservationController = require('../Controllers/ReservationController')

router.post('/reservation', verifyToken, ReservationController.AddReservation)


module.exports = router;