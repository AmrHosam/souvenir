import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

import orderRoutes from './routes/orderRoutes.js'

import cartRouter from './routes/cartRoutes.js'

import uploadRouter from './routes/uploadRoutes.js'
dotenv.config()

const app = express()
//Set Port
const port = process.env.PORT || 5000
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on ${port}`))
//Connect to database
connectDB()



app.get('/', (req, res) => {
    res.send(`app is running on ${port}`)
})

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', (userRouter))
app.use('/shop', productRouter)
app.use * ('/orders', orderRoutes)

app.use('/cart', cartRouter)

app.use('/api/upload', uploadRouter)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
