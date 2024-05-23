import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './Routes/authRoute.js'
import UserRoute from './Routes/userRoute.js'
import PostRoute from './Routes/postRoute.js'
import UploadRoute from './Routes/uploadRoute.js'
import cors from 'cors'

const app = express()
// set up public folder
app.use(express.static('public'))
app.use('/images', express.static('images'))

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT, () => console.log('Server running')))
  .catch((error) => {
    console.log(process.env.MONGO_URL)
    console.log(error.message)
  })

// Routes defining
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
