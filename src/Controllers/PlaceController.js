const User = require('../Models/User.model')
const Places = require('../Models/Place.model')
const jwt = require('jsonwebtoken');


//création utilisateur
exports.AddPlace =(req, res) => {

    console.log(req.body)

       const title= req.body.title
       const type= req.body.type
       const owner= req.body.owner
       const pricePerDay = req.body.pricePerDay
       const capcity = req.body.capcity
       const description = req.body.description
       const image = req.body.image
    //    const Addresse = req.body.Addresse

    const newPlace = new Places({
         title: title,
         type: type,
         owner: owner,
         pricePerDay: pricePerDay,
         capcity: capcity,
         description: description,
         image: image,
    })
    newPlace.save()

    res.send(newPlace)

}

exports.GetPlaces =(req, res)=>{
    Places.find()
    .then((places)=>{
         res.send(places)

    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
