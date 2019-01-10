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


module.exports = router;