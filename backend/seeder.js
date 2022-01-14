import User from "./models/userModel.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()
connectDB()

const importData = async () =>  {
    try{
        await User.deleteMany()
        const createdUsers = await User.insertMany(users)
        console.log("data imported")
        process.exit()
    }
    catch(error){
        console.log(error)
    }
}
const destroyData = async () =>  {
    try{
        await User.deleteMany()
        console.log("data destroyed")
        process.exit()
    }
    catch(error){
        console.log(error)
    }
}
if (process.argv[2] === '-d'){
    destroyData()

} 
else importData()