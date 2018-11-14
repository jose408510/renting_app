const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
//load input validation 
const validateRegisterInput = require('../../validation/register')

// loading users
const User = require('../../models/users')

router.get('/test' , (req,res) => {
    res.json({msg: 'Users works'})
})

router.post('/register' , (req,res) => {
 
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            errors.email = 'Email already exists ';
            return res.status(400).json(errors)
            //  res.status(400).json({email: 'Email Already exist'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size 
                r: 'pg' , // rating
                d: 'mm'  // default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt , (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash ; 
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })

        }
    });
});


// api/users/login
// login user / returning jwt 
// public access 
    router.post('/login' , (req,res) => {

        const { errors, isValid } = validateLoginInput(req.body);

        // check validation
        if(!isValid){
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        //find user by email 
        User.findOne({email})
        .then(user => {
            // check for user
            if(!user){
                errors.email = "User not found "
                return res.status(404).json(errors)
            }

            // check password 
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                   // User matched 

                   const payload = { id: user.id, name: user.name , avatar: user.avatar } // Create Jwt Payload

                   // sign token

                   jwt.sign(payload,
                     keys.secretOrKey , 
                     { expiresIn: 3600}, (err,token) => {
                     res.json({
                         success: true,
                         token: 'Bearer ' + token
                     })
                   }) 
                }
                 else {
                     errors.password = 'password incorrect'
                    return res.status(400).json(errors);
                }   
            })
        });
    })
// api/users/current
// / returning current user  
// private access

router.get('/current' , passport.authenticate('jwt' , {session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;
