const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


const Port =  process.env.Port || 5000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Routes
const users = require('./routes/api/users');
// Using Routes 
app.use('/api/users/',users)

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fy13j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    app.listen(Port), console.log(`Listening on Port ${Port}`);
}).catch(err => {
    console.log(err);
})