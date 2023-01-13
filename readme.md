Créer un model Place

title
type => Model type (name) ex: Appartment, Loft, Maison, Chateau, Cabane, Camping
owner (user) => relationnel type User
pricePerDay
images: []
capacity = Number
description
Address : {
city,
street,
zipCode,
gps: { lat, long } }
Model User: rajouter propriété "type" ENUM[OWNER, CUSTOMER] - L 'utilisateur peut être les deux

//controlller: 
createPlace Pour relationnel: https: //mongoosejs.com/docs/populate.html 
getMyPlace / getPlaceByUser 
getMyPlaces / getPlacesByUser




ynov-m1-api/readme.md at main · ynovzelab/ynov-m1-api