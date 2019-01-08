const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const jsonkey = require('../../config/jsonkey')
// Validation Flies
const validateSignup = require('../../validation/signup')
const validateSignin = require('../../validation/signin')
//Load User models
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

// @signup new users 
// Creating a new user

router.post('/signup', ( req, res ) => {
   
    const { errors, isValid } = validateSignup(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Users.findOne({email: req.body.email}).then(user => {
        if(user){
            error.email = 'Email Already Exist'
            return res.status(400).json(errors);
        } else{
            const newUser = new Users({
                email: req.body.email,
                password: req.body.password
            });
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            })
         })
        }
    })
})

// @public router
// @sign-in for exisiting users 
router.get('/signin', ( req, res ) => {
    const { errors, isValid } = validateSignin(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email 
    const password = req.body.password

    Users.findOne({email}).then(user => {
        //check for user
        if(!user) {
            errors.email = "User not found"
            return res.status(404).json(errors)
        }
        //password check
        bcrypt.compare(password , user.password).then(isMatch => {
            if(isMatch){
                const payload = { id: user.id , } // jwt payload
                jwt.sign(payload ,
                     jsonkey.secretOrKey,
                      { expiresIn: 3600 }, 
                      (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                })
            }else {
                return res.status(400).json({pasword: 'Password Incorrect'})
            }
        })
    })


})

module.exports = router;