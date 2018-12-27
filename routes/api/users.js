const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 

// Validation Flies
const validateSignup = require('../../validation/signup')
//Load User models
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

// @register new users 
router.post('/signup', ( req, res ) => {
   
    const { errors, isValid } = validateSignup(req.body);

    // Check Validation
    if (!isValid) {
        console.log(req.body)
        return res.status(400).json(errors)
    }
    Users.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json('User Already Exist');
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
    res.json({
        email: "pablo",
        password: "jose@email"
    })
})

module.exports = router;