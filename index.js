const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // auto parse json body
const cors = require('cors');
require('dotenv').config() //accés aux variables d'environnement

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// const PORT = process.env.PORT;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

const apiRouter = require('./src/Routes')


//allow acces from port != 4040
app.use(cors({
    origin: ['*']
  }));

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


app.listen(process.env.PORT, function () {
    console.log(`server start on port ${process.env.PORT}`);
});