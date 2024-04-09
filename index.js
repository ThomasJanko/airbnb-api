const bodyParser = require('body-parser'); // auto parse json body
const cors = require('cors');
require('dotenv').config() //accés aux variables d'environnement

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// const PORT = process.env.PORT;
const uri = process.env.MONGO_URL;

const apiRouter = require('./src/Routes')


app.use(cors({
    origin: ['http://airbnb.thomas-jan.fr', 'https://airbnb.thomas-jan.fr'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

//connection database MongoDB
app.use(bodyParser.json());
mongoose.set('strictQuery', false)
mongoose.connect(uri)
.then(() => {
    console.log("Successfully connected")
})
.catch((err) => {
    console.log(err)
})

app.use('/api', apiRouter);
app.get('/', (req, res) => {
    res.send('Airbnb API running !')
})


app.listen(process.env.PORT, function () {
    console.log(`server start on port ${process.env.PORT}`);
});