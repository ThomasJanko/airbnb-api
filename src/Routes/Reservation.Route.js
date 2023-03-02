const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/VerifyToken')
const ReservationController = require('../Controllers/ReservationController')
const verifyIsAdmin = require('../Middleware/VerifyisAdmin');

router.post('/reservation', verifyToken, ReservationController.AddReservation)
router.get('/reservations',verifyToken, verifyIsAdmin, ReservationController.getReservations)


module.exports = router;