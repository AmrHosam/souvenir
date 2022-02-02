import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
      token = req.headers.authorization.split(' ')[1]

      jwt.verify(token, process.env.JWT_SECRET,{ignoreExpiration:true},asyncHandler(async(err, verifiedJwt)=>{
        if(err){
          res.status(401)
          res.send({message:'token'})
        }
        else{
          console.log('verified:',verifiedJwt)
          req.user = await User.findById(verifiedJwt.id).select('-password')
          next()
        
        }
      }))

   
  }

  if (!token) {
    res.status(401)
    res.send({message:'Not authorized, no token'})
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    res.send({message:req.user})
  }
}

export { protect, admin }
