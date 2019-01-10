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
    
    const { skills, youtube, twitter, facebook, linkedin, instagram } = req.body;
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(','),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };
    
    // get fields
    // Profiles.findOne({ user: req.user.id})
    // .then(profile => {
    //     profile.findOneAndUpdate({ user: req.user.id }, { $set: })
    // })
})

module.exports = router;