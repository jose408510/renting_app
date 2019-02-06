const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load DbModel
const Profiles = require('../../models/Profiles');
const Users = require('../../models/Users');
const Houses = require('../../models/Houses');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

router.get('/current/home' ,( req,res ) => {
    // display all the home that are avalible
    const errors = {};

    Profiles.find()
    .populate('user' , 'images', 'street' ,'state' , 'city', 'price', 'created'  ) // going to add house here to populate
        .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
        
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });

//   router.get('/current/home/:id', ( req , res ) => {
//     Profiles.findById(req.params.id)
//     .then(posts => res.json(posts))
//     .catch(err => 
//         res.status(404).json({ nopostfound: 'No post found with that ID'})
//         );
//     })

  module.exports = router;