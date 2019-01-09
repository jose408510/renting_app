const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// Load DbModel
const Profiles = require('../../models/Profiles');
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))



module.exports = router;