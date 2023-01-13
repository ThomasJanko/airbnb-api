const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/VerifyToken')
const PlaceController = require('../Controllers/PlaceController')

router.post('/place', PlaceController.AddPlace)
router.get('/places', PlaceController.GetPlaces)

module.exports = router;