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

router.get('/home' ,( req,res ) => {
    // display all the home that are avalible
})





module.exports = router;