const bcrypt = require('bcrypt');
const User = require('../Models/User.model')
const jwt = require('jsonwebtoken');

exports.Test= (req, res) => {
    console.log('test request url /test')
    // res.send('Test: OK');
    // res.send('<h1>Test: OK</h1>');
    res.send({
        message: 'Status: 200',
        auth: false,
        products: [
            {
                id:1,
                name: 'product1'
            },
            {
                id:2,
                name: 'product2'
            },
        ]
    })  
}



//update User
exports.EditUser =(req, res) =>{
    User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        password: req.body.password
    }, {new: true}) //retourne User avec changements
    .then((user)=>{
        res.send(user);
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
}

//Delete User
exports.DeleteUser = (req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.send('User desactivated')
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
}

//FindUserbyId
exports.GetOneUser = (req, res)=>{
    User.findById(req.params.id)
    // User.findById(req.userId)
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
//GetAuthUser
exports.GetAuthUser = (req, res)=>{
    // User.findById(req.params.id)
    console.log(req.userId)
    User.findById(req.userId)
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}

//findAllUsers
exports.GetUsers =(req, res)=>{
    User.find()
    .then((users)=>{
         res.send(users)
        // res.status(200).json(users)

    })
    .catch((err)=>{
        res.status(500).send(err)
    })

    //FindUserbyId
// exports.GetUserByEmail = (req, res)=>{
//     console.log(req)
//     User.findOne(req)
//     // User.findById(req.userId)
//     .then((user)=>{
//         res.send(user)
//     })
//     .catch((err)=>{
//         res.status(500).send(err)
//     })
// }
}
