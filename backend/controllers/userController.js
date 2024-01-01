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

export {authUser}