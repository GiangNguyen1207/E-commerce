import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import cors from 'cors'

import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

import productRouter from './routers/product'
import userRouter from './routers/user'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import './config/passport'
import unless from './util/unless'
import authenticate from './middlewares/authenticate'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    'MongoDB connected'
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

//Passport initialize
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
//Authenticate
app.use(
  '/api',
  apiContentType,
  unless(
    [
      '/v1/users/google-authenticate',
      '/v1/products/',
      '/v1/users/signUp',
      '/v1/users/signIn',
      '/v1/users/forgotPassword',
    ],
    authenticate
  )
)

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
