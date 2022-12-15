const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // auto parse json body
const User = require('./Models/User.model')

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 4040;
const uri = "mongodb+srv://admin:admin@cluster0.0b4sc5v.mongodb.net/?retryWrites=true&w=majority";


const apiRouter = require('./Routes')

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


app.listen(PORT, function () {
    console.log(`server start on port ${PORT}`);
});