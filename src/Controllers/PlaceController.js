const User = require('../Models/User.model')
const Place = require('../Models/Place.model')
const jwt = require('jsonwebtoken');


//création utilisateur
exports.AddPlace =(req, res) => {

    console.log(req.body)

       const title= req.body.title
       const type= req.body.type
    //    const owner= req.body.owner
       const pricePerDay = req.body.pricePerDay
       const capcity = req.body.capcity
       const description = req.body.description
       const image = req.body.image
    //    const Addresse = req.body.Addresse

        const newPlace = new Place({
            title: title,
            type: type,
            pricePerDay: pricePerDay,
            capcity: capcity,
            description: description,
            image: image,
       })
    User.findById(req.body.owner)
    .then((user) => {
        newPlace.owner = user;
        return newPlace.save();
    })
    .then(() => res.send({ message: "place created successfully" }))
    .catch((err) => res.status(500).send(err));
    //    newPlace.save()
   
    //    res.send(newPlace)
    
    

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
