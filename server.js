const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Users = require('./models/Users')


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const Port =  process.env.Port || 5000


app.post('/users', ( req, res ) => {
    const newUser = new Users({
        email: req.body.email,
        password: req.body.email
    })
    console.log(newUser)
    newUser.save()
})
app.get('/newusers', ( req, res ) => {
    res.json({
        email: "pablo",
        password: "jose@email"
    })
})


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fy13j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    app.listen(Port);
}).catch(err => {
    console.log(err);
})