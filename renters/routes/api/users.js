const express = require('express');
const router = express.Router();
const gravatar = requrie('gravatar')
// loading users
const User = require('../../models/users')

router.get('/test' , (req,res) => {
    res.json({msg: 'Users works'})
})

router.get('/register' , (req,res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already Exist'})
        } else {
            const avatar = gravatar.url(req.body.email , {
                s: '200', //size 
                r: 'pg', //rating
                d: 'mm' // Default
            });


            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })
        }
    }) 
})

module.exports = router;