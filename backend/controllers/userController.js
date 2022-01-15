import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'
export const authenticateUser = AsyncHandler (async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    const match = await bcrypt.compare(password, user.password);
    if (user &&  match)
    {
         res.json({
             _id : user._id,
             name : user.name,
             email : user.email,
             tel : user.tel,
             address : user.address,
             cart : user.cart,
             token : generateToken()
         })
    }
    else {
        res.status(401)
    res.send({message:'Invalid Email or Password'});
    }
})