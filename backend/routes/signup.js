const express = require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const jwtAuth=require('../middleware/jwtAuthentication')

const secret="anyRandomKey8712672!@#$%^&*()"

const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/signup', [
    body('email', 'Email invalid').isEmail(),
    body('password','Password must contain atleast 8 letters').isLength({min:8})
], async (req, res) => {

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(404).json({
                error: error.array()
            })
        }

        const user=await User.findOne({
            email:req.body.email
        })
        if(user)
        {
            return res.json({
                message :`User with ${req.body.email} already exists`
            })
        }

        //salting
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);

        const userN= await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        const data={
            user:{
                id:userN.id
            }
        }
        const token=jwt.sign(data,secret);
        res.json({
            "Authorization":"Bearer "+token,
            "Message":"User created succesfuly !"
        })

       
    }
    catch (error) {
        res.json({
            "error": error
        })
    }

})

module.exports = router;