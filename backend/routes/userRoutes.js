import express from 'express'
import { authenticateUser } from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/login',authenticateUser)

export default userRouter