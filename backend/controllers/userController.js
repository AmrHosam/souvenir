import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
export const authenticateUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);
  if (user && match) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tel: user.tel,
      isAdmin:user.isAdmin,
      address: user.address,
      cart: user.cart,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.send({ message: "Invalid Email or Password" });
  }
});

export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, tel, address, cart } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    res.send({message: "This Email is used"});
  } else {
    try {
      const CreateUser = await new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        tel,
        address,
        cart,
        isAdmin: false,
      });
      const createdUser = await CreateUser.save();
      res.json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        tel: createdUser.tel,
        address: createdUser.address,
        cart: createdUser.cart,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser._id),
      });
    } catch (error) {
      res.status(401);
      res.send({message:error});
    }
  }
});
