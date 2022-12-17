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

exports.Login = (req, res) => {
    console.log(req.body)
    
    // console.log(JSON.parse(req.body))
    if(req.body.email && req.body.password){

        const email = req.body.email
        const password = req.body.password

       
        User.findOne({email: email }, function(err, user) {
            if(err){ return res.status(404)}
            if(user){
                bcrypt.compare(password,
                    user.password, function(err, result) {
                        if(result){
                            res.send({
                                    status: res.statusCode,
                                    auth: true,
                                    user: user
                                })
                        }
                        else{
                            res.status(404).send(err)
                        }
                    }
                )
            }
        })
        
    }
    
}

//création utilisateur
exports.Register =(req, res) => {

    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName){
        return res.status(404).send({
            auth: false,
            message: 'Missing fields'
        })
    }
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
                var token = jwt.sign({id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);//Math.floor(Date.now() / 1000) + (60 * 60)
                res.send({user, token});
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
        // res.status(200).json(users)

    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
