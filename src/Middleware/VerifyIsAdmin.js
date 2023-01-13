const jwt = require('jsonwebtoken');

function verifyIsAdmin(req, res, next) {
    let token = req.headers.authorization;

    if(!token){
        return res.status(403).send({
            token: null,
            message: 'Missing Token'
        })
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          if (authData.isAdmin) {
            next();
          } else {
            res.status(401).send('Only Admin can do this !');
          }
        }
      });

    // if(!req.userToken.isAdmin){
    //     return res.status(403).send({
    //         auth: false,
    //         message: 'Only Admin can do this!'
    //     })
    // }
    // next();
    

    
}

module.exports = verifyIsAdmin;