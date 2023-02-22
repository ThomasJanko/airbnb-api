const User = require('../Models/User.model')
const Place = require('../Models/Place.model')
const jwt = require('jsonwebtoken');


//création utilisateur
exports.AddPlace = async (req, res) => {

    try {
        const newPlace = new Place({
            title: req.body.title,
            type: req.body.type,
            owner: req.userId,
            pricePerDay: req.body.pricePerDay,
            capacity: req.body.capacity,
            description: req.body.description,
            image: req.body.image,
            Addresse: {
                city: req.body.Addresse.city,
                street: {
                    zipCode: req.body.Addresse.street.zipCode,
                    gps: {
                        lat: req.body.Addresse.street.gps.lat,
                        long: req.body.Addresse.street.gps.long
                    }
                }
            }
        });
        const savedPlace = await newPlace.save();
        const updatedUser = await User.findOneAndUpdate({_id: req.userId}, {$push: {places: savedPlace._id}}, {new: true}).exec();
        console.log(updatedUser);
        res.status(201).send(savedPlace);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.GetPlaces =(req, res)=>{
    Place.find().populate('owner')
    .then((places)=>{
         res.send(places)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.GetMyPlaces =(req, res)=>{
    // console.log(req.userId)
    User.findById(req.userId).populate('places')
    .then((user)=>{
        res.send(user)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.GetPlaceId =(req, res)=>{
    Place.findById(req.params.id).populate('owner')
    .then((place)=>{
        res.send(place)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.DeletePlace =(req, res)=>{
    console.log(req.body);
    if(req.body.owner == req.userId){
        Place.findByIdAndDelete(req.body._id)
        .then((place)=>{
            res.status(200).json({
                message: `Place with ID ${req.params.id} successfully deleted.`
            });
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    }
    else{
        return res.status(403).json({
            error: 'You are not authorized to delete this place.'
          });
    }
   
}
