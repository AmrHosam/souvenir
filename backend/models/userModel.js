import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    address: {
      details: { type: String },
      governorate: { type: String },
      city: { type: String },
      street: { type: String },
      building: { type: String },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
