import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser= asyncHandler(async(req,res) => {
    const {email,password}= req.body

    //console.log('email: '+email+'\n'+'password: '+password);

   const user = await User.findOne({email})
   //console.log(user);
   

   if(user && (await user.matchPassword(password))){
    res.json({
        _id:user._id,
        email:user.email,
        name:user.name,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
    res.status(401)
    throw new Error('Invalid email or password')
   }
})

// @desc Register a new user
// @route POST /api/users/
// @access Public
const registerUser= asyncHandler(async(req,res) => {
    const {name,email,password}= req.body

   const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error ('User already exists')
    }
   const user = await User.create({
    name,
    email,
    password})
   //console.log(user);
   

   if(user){
    res.status(201)
    res.json({
        _id:user._id,
        email:user.email,
        name:user.name,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
    res.status(40)
    throw new Error('Invalid user data')
   }
})


// @desc Get user profile
// @route Get /api/users/profile
// @access Private
const getUserProfile= asyncHandler(async(req,res) => {
   const user = await User.findById(req.user._id)
   if(user){
    res.json({
        _id:user._id,
        email:user.email,
        name:user.name,
        isAdmin:user.isAdmin,
    })
   }else{
    res.status(404)
    throw new Error('user not found')
   }
   res.send('success')
})

export {authUser,getUserProfile,registerUser}