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
          place: place,
          owner: owner,
          nbOfNights,
          totalPrice,
          dates,
        });
    
        // Save reservation to database
        const savedReservation = await reservation.save();
        const updatedUser = await UserModel.findOneAndUpdate({_id: req.userId}, {$push: {reservations: savedReservation._id}}, {new: true}).exec();
        console.log(updatedUser)
        res.status(201).json({ reservation });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
    
}

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('owner');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}