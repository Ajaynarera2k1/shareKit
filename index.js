import Dotenv from 'dotenv'
Dotenv.config()


// database connection
import mongoose from 'mongoose'
mongoose.connect(process.env.DB_URL)



// server creation
import express from 'express'
import { login, signup  } from './controller/user.controller.js'
import bodyParser from 'body-parser'
const app = express()
app.listen(8080)


// middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('view'))


// rest api
app.post('/api/signup', signup)
app.post('/api/login' , login)