const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load DbModel
const Profiles = require('../../models/Profiles');
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

router.get('/' , passport.authenticate('jwt' , { session: false }), ( req,res ) => {
    const errors = {};
    Profiles.findOne({ user: req.user.id })
    .then(profile => {
        if(!profile) {
            errors.noprofile = "there are no Profiles "
            return res.status(404).json(errors)
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err))
})

router.post('/' , passport.authenticate('jwt' , { session: false }), ( req,res ) => {   
    const errors = {}
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    //info field
    profileFields.info = {};
    if (req.body.name) profileFields.social.name = req.body.name;
    if (req.body.bio) profileFields.social.bio = req.body.bio;
    if (req.body.phone) profileFields.social.phone = req.body.phone;
    if (req.body.workphone) profileFields.social.workphone = req.body.workphone;
    if (req.body.website) profileFields.social.website = req.body.website;
    if (req.body.city) profileFields.social.city = req.body.city;
    if (req.body.state) profileFields.social.state = req.body.state;
    // social network
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profiles.findOne({ user: req.user.id}).then(profile => {
    if(profile) {
        Profiles.findOneAndUpdate({ user: req.user.id },{ $set: profileFields })
        .then(profile =>
             res.json(profile)
        )
    }
    else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
        // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
        }   
       )}
    })
})
    

module.exports = router;