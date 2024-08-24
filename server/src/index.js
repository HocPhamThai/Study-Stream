import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './routes/authRoute.js'
import UserRoute from './routes/userRoute.js'
import PostRoute from './routes/postRoute.js'
import UploadRoute from './routes/uploadRoute.js'
import ChatRoute from './routes/chatRoute.js'
import MessageRoute from './routes/messageRoute.js'
import WorkingTimeRoute from './routes/workingTimeRoute.js'
import TopicRoute from './routes/topicRoute.js'
import ChatBotRoute from './routes/chatBotRoute.js'
import songRoute from './routes/songRoute.js'
import rewardsRoute from './routes/rewardsRoute.js'
import taskRoute from './routes/taskRoute.js'
import courseTopicRoute from './routes/courseTopicRoute.js'
import cors from 'cors'
import xss from 'xss-clean'
import helmet from 'helmet'

const app = express()
// set up public folder
app.use(express.static('src/public'))
app.use('/images', express.static('images'))

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(xss())
app.use(helmet())
app.use(cookieParser())

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
app.use('/chat', ChatRoute)
app.use('/chatbot', ChatBotRoute)
app.use('/message', MessageRoute)
app.use('/workingtime', WorkingTimeRoute)
app.use('/topic', TopicRoute)
app.use('/songs', songRoute)
app.use('/rewards', rewardsRoute)
app.use('/tasks', taskRoute)
app.use('/courseTopics', courseTopicRoute)
