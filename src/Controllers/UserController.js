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
        password: req.body.password,
        avatar: req.body.avatar
    }, {new: true}) //retourne User avec changements
    .then((user)=>{
        res.send(user);
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
}


// exports.EditMe = async (req, res) => {
//     const { firstName, lastName, isAdmin, currentPassword, newPassword, avatar } = req.body;
//     const userId = req.userId;
  
//     // Find the user by ID
//     let user = await User.findById(userId);
  
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
  
//     // Check if the current password is correct
//     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
//     if (!isCurrentPasswordValid) {
//       return res.status(400).send({ message: 'Current password is incorrect' });
//     }
  
//     // If the new password is provided, hash it and update the user's document
//     if (newPassword) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(newPassword, salt);
//       user.password = hashedPassword;
//     }
  
//     // Update the other fields
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.isAdmin = isAdmin;
//     user.avatar = avatar;
  
//     try {
//       const updatedUser = await user.save();
//       res.send(updatedUser);
//     } catch (err) {
//       res.status(500).send({ message: err.message });
//     }
//   };

//update User Auth
exports.EditMe =(req, res) =>{
    User.findByIdAndUpdate(req.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        //password: req.body.password,
        avatar: req.body.avatar
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
    // console.log(req.userId)
    User.findById(req.userId).populate('places').populate({path: 'reservations', populate: {path: 'owner'}})
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}

//findAllUsers
exports.GetUsers =(req, res)=>{
    User.find().populate('places')
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
