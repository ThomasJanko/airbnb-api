const express = require('express');
const bodyParser = require('body-parser'); // auto parse json body

const app = express();
const PORT = 4040;

app.use(bodyParser.json());


app.get('/test', (req, res) => {
    console.log('test requete a /test')
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
})

app.post('/api/v1/auth/login', (req, res) => {
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
})

const MyUser ={
    // JSON.stringify({
    firstName: 'Thomas',
    lastname: 'Jankowski'
    // })
}


app.listen(PORT, function () {
    console.log(`server start on port ${PORT}`);
});