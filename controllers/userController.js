const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}= req.body
    if (!username||!email||!password) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const userAvalible = await User.findOne({email})
    if (userAvalible) {
        res.status(400)
        throw new Error("user is already register")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("user data not valid")
    }    
    res.json({message:"register the user"})
})
const loginUser =asyncHandler(async(req,res)=>{
    const {email,password}= req.body
    if (!email||!password) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const user = await User.findOne({email})
    if (user && await bcrypt.compare(password,user.password)) {
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )
    res.status(200).json({accessToken})
    }else{
        res.status(401)
        res.json({message:"password not valid"})
    }
})
const getCurrentUser =asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,getCurrentUser};