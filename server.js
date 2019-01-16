const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const houses = require('./routes/api/houses')



const Port =  process.env.Port || 5000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)


// Using Routes 
app.use('/api/users/',users)
app.use('/api/profiles/', profiles)
app.use('/api/houses/', houses)

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fy13j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    app.listen(Port), console.log(`Listening on Port ${Port}`);
}).catch(err => {
    console.log(err);
})