import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password : {
        type: String,
        required: true
    },
    tel :{
        type: String,
        required: true,
    },
    address : {
        city:{type: String},
        district:{type: String},
        street:{type: String},
        block:{type: String}
        },
    isAdmin : {
        type: Boolean,
        required: true,
        default:false
    }
     
},{timestamps:true})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
const User = mongoose.model('User',userSchema)
export default User;