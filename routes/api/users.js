const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");


router.get("/", (req,res) => res.send("User route"));

router.post("/", 
[check('name', "Name is required").not().isEmpty(), 
check('email', "Valid email is required").isEmail(),
check('password',"Password must have atleast 4 characters").isLength({min:4,}),
],

async (req,res) => {

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({error: errors.array() });
}

 const { name,email,password } = req.body;
 try {
    let user = await User.findOne({ email });
    if(user){
        return res.status(400).json({errors: [{msg: "user already exists"}]})
    }
    user = new User({
        name,
        email,
        password,
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const playload = {
        user:{
            id: user.id,
        },
    };
    jwt.sign(
        playload,
        config.get("jwtSecret"),
        {expiresIn: 72000},
        (err, token) =>{
        if(err) throw err;
        res.json({ token });
        }
    );
 } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
 }
} );

module.exports = router;