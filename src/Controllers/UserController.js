const bcrypt = require('bcrypt');
const User = require('../Models/User.model')

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

exports.Login = (req, res) => {
    console.log(req.body)
    // console.log(JSON.parse(req.body))
    if(!req.body.email || !req.body.password){
        return res.status(404).send({
            auth: false,
            message: 'User not found'
        })
    }
    res.send({
        status: res.statusCode,
        auth: true,
        user: req.body
    })
}

//création utilisateur
exports.Register =(req, res) => {
       const firstName= req.body.firstName
       const lastName= req.body.lastName
       const email= req.body.email
       const password = req.body.password

    bcrypt.hash(password, 6)
    .then(hashedPassword => {
        const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });
            newUser.save()
            .then((user)=>{
                res.send(user);
            })
            .catch((err)=>{
                res.status(404).send(err)
            });
        });
}

//update User
exports.EditUser =(req, res) =>{
    User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
