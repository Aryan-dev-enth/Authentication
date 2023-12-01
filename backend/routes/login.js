const express = require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const jwtAuth=require('../middleware/jwtAuthentication')

const secret="anyRandomKey8712672!@#$%^&*()"

const router = express.Router();
const { body, validationResult } = require('express-validator');

//user authentication /api/auth/login
router.post('/login', [
    body('email', 'Email invalid').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req, res) => {

    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(404).json({error:error.array()})
    }

    const {email,password}=req.body;

    try
    {
        const user=await User.findOne({email});
        if(!user)
        {
            return res.json({
                messsage:"Try login using different credentials"
            })
        }
        
        const passwordCompare = await bcrypt.compare(password,user.password);

        if(passwordCompare == false)
        {
            return res.json({
                message:"Try login using different credentials"
            })
        }

        const payload={
            user:{
                id:user.id
            }
        }

        const token=jwt.sign(payload,secret);
        res.json({
            "Authorization":"Bearer "+token
        })
    }

    catch(error)
    {
        res.json({
            error
        })
    }

})

module.exports = router;