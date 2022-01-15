import express from "express";
import {
  authenticateUser,
  registerUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/login", authenticateUser);
userRouter.post("/register", registerUser);
export default userRouter;
