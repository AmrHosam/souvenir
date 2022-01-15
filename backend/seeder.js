import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import products from './data/products.js'
import users from "./data/users.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()
connectDB()

const importData = async () =>  {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        const createdUsers = await User.insertMany(users)
        await Product.insertMany(products)
        console.log("data imported")
        process.exit()
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}
const destroyData = async () =>  {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        console.log("data destroyed")
        process.exit()
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}
if (process.argv[2] === '-d'){
    destroyData()

} 
else importData()