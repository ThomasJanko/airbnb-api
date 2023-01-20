const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/VerifyToken')
const PlaceController = require('../Controllers/PlaceController')

router.post('/place', verifyToken, PlaceController.AddPlace)
router.get('/places', PlaceController.GetPlaces)
router.get('/myplaces', PlaceController.GetMyPlaces)

module.exports = router;