const express = require('express');
const router = express.Router();

//Load User models
const Users = require('../../models/Users');

router.get('/test', ( req, res ) => res.json({msg:"Users Works"
}))

// @public route
// @register new users 
router.post('/signup', ( req, res ) => {
    Users.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json('User Already Exist');
        } else{
            const newUser = new Users({
                email: req.body.email,
                password: req.body.email
            })
            console.log(newUser)
            newUser.save()
        }
        //    think about incorporating validator npm package... 
        //    need validation to check things
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