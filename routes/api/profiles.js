const express = require('express');
      router = express.Router();
      mongoose = require('mongoose');
      passport = require('passport');
      multer   = require('multer');
      // path     = require('path')
// Load DbModel
const Profiles = require('../../models/Profiles');
const Users = require('../../models/Users');
// validation files
const validateProfile = require('../../validation/profile');
const validateHome = require('../../validation/home');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})

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
    const { errors, isValid } = validateProfile(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
      }    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    //info field
    profileFields.info = {};
    if (req.body.name) profileFields.info.name = req.body.name;
    if (req.body.bio) profileFields.info.bio = req.body.bio;
    if (req.body.phone) profileFields.info.phone = req.body.phone;
    if (req.body.workphone) profileFields.info.workphone = req.body.workphone;
    if (req.body.website) profileFields.info.website = req.body.website;
    if (req.body.city) profileFields.info.city = req.body.city;
    if (req.body.state) profileFields.info.state = req.body.state;
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
        Profiles.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
        // Save Profile
            new Profiles(profileFields).save().then(profile => res.json(profile));
        }   
       )}
    })
})
    
router.get('/handle/:handle', (req, res) => {
    const errors = {};
  // need to add houses here.. 

    Profiles.findOne({ handle: req.params.handle })
      .populate('user', 'name', 'bio' , 'city , state') // going to add house here to populate
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });

  router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profiles.findOne({ user: req.params.user_id })
      .populate('user', 'name', 'bio' , 'city , state') // going to add house here to populate
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });

  router.get('/all', (req, res) => {
    // finding the user profile
    const errors = {};
  
    Profiles.find()
    .populate('user', 'name', 'bio' , 'city , state') // going to add house here to populate
        .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });

  router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profiles.findOneAndRemove({ user: req.user.id }).then(() => {
        Users.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );

  router.post('/homes',passport.authenticate('jwt', { session: false }), upload.any('image'), (req, res) => {
    // adding homes to the profile of the user 
    const { errors, isValid } = validateHome(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }

      var images = []
      for(var i = 0; i< req.files.length; i++){
          // console.log(req.files[i].filename)
          let some = req.files[i].filename.split(',')
          images.push(some)
      }
      // console.log(...images)
      
      Profiles.findOne({ user: req.user.id }).then(profile => {
        const newHome = {
          street: req.body.street,
          zip: req.body.zip,
          state: req.body.state,
          city: req.body.state,
          image: images,
          addinfo: req.body.addinfo,
          yearbuilt: req.body.yearbuilt,
          rooms: req.body.rooms,
          bathroom: req.body.bathroom,
          parking: req.body.parking,
          price: req.body.price,
          created: req.body.created
        };
        // console.log(newHome.image)
        profile.description.unshift(newHome);
  
        profile.save().then(profile => res.json(profile));
      });
  });

  router.delete('/homes/:home_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profiles.finOne({ user: req.user.id}).then(profile => {
      const removeIndex = profile.description.map(item => item.id)
      .indexOf(req.params.home_id);
      profile.description.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
  })

module.exports = router;