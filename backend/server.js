import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
dotenv.config()

const app = express()
//Set Port
const port = process.env.PORT || 5000
app.listen(port,console.log(`Server running in ${process.env.NODE_ENV} on ${port}`))
//Connect to database
connectDB()

app.get('/',(req,res) => {
    res.send(`app is running on ${port}`)
})

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',(userRouter))