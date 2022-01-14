import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
//Set Port
const port = process.env.PORT || 5000
app.listen(port,console.log(`Server running in ${process.env.NODE_ENV} on ${port}`))

app.get('/',(req,res) => {
    res.send(`app is running on ${port}`)
})

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
