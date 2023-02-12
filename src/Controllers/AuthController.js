
const bcrypt = require('bcrypt');
const User = require('../Models/User.model')
const jwt = require('jsonwebtoken');

exports.Login =(req, res) => {
   
        const email = req.body.email
        const password = req.body.password
       
        User.findOne({email: email }, function(err, user) {
            if(err){ return res.status(404)}
            if(user){
                bcrypt.compare(password,
                    user.password, function(err, result) {
                        if(!!result){
                            console.log('Login Successful')
                            var token = jwt.sign({id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);//Math.floor(Date.now() / 1000) + (60 * 60)
                            res.status(200).send(token);
                            // res.send({
                            //         status: res.statusCode,
                            //         auth: true,
                            //         user: user
                            //     })
                        }
                        else{
                            console.log('Password Incorrect')
                            res.status(404).send(err)
                        }
                    }
                )
            }
            else{res.status(404).send('Email or Password Incorrect')}
        })
        
    
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
//Hash password
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
                res.send(token);
                // res.send({user, token});
            })
            .catch((err)=>{
                res.status(404).send(err)
            });
        });
}