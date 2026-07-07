const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post("/register",async(req,res)=>{
  try{
    console.log("Register request received:", req.body);
    const {username,password} = req.body;
    
    if (!username || !password) {
      return res.status(400).json({error:"Username and password are required"});
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({username,password:hashedPassword});
    await user.save();
    console.log("User registered successfully:", username);
    res.status(201).json({message:"User created successfully"});
  }catch(error){
    console.error("Register error:", error.message);
    res.status(500).json({error:error.message});
  }
});

router.post("/login",async(req,res)=>{
    try{
        console.log("Login request received:", req.body);
        const {username,password} = req.body;
        
        if (!username || !password) {
          return res.status(400).json({error:"Username and password are required"});
        }
        
        const user = await User.findOne({username});
        if(!user){
            console.log("User not found:", username);
            return res.status(400).json({error:"Invalid username or password"});
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            console.log("Password mismatch for user:", username);
            return res.status(400).json({error:"Invalid username or password"});
        }
        console.log("User logged in successfully:", username);
        res.status(200).json({message:"Login successful"});
    }catch(error){
        console.error("Login error:", error.message);
        res.status(500).json({error:error.message});
    }
});

//foradmin
router.post('/adminlogin', (req, res) => {
  const { id, password } = req.body;
  if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
    res.json({ message: 'Admin login successful' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;