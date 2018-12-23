const express = require('express');
const router = express.Router();

//Load User models
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

// @public route
// @register new users 
router.post('/signup', ( req, res ) => {
    const newUser = new Users({
        email: req.body.email,
        password: req.body.email
    })
    console.log(newUser)
    newUser.save()
})

// @public router
// @sign-in for exisiting users 
router.get('/newusers', ( req, res ) => {
    res.json({
        email: "pablo",
        password: "jose@email"
    })
})

module.exports = router;