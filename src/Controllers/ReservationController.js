const PlaceModel = require("../Models/Place.model");
const Reservation = require("../Models/Reservation.model");
const UserModel = require("../Models/User.model");

//update User
exports.AddReservation =async (req, res) =>{
    try {
        const { title, placeId, ownerId, nbOfNights, totalPrice, dates } = req.body;
    
        // Check if place and owner exists
        const place = await PlaceModel.findById(placeId);
        const owner = await UserModel.findById(ownerId);
    
        if (!place || !owner) {
          return res.status(400).json({ error: 'Place or Owner not found' });
        }
    
        // Create reservation object
        const reservation = new Reservation({
          title,
          place: place._id,
          owner: owner._id,
          nbOfNights,
          totalPrice,
          dates,
        });
    
        // Save reservation to database
        await reservation.save();
    
        res.status(201).json({ reservation });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
    
}