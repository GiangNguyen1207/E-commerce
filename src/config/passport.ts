import passport from 'passport'
import passportLocal from 'passport-local'
import passportFacebook from 'passport-facebook'

import { Request, Response, NextFunction } from 'express'
import User from '../models/User';
import { catchClause } from '@babel/types';

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy

const GoogleTokenStrategy = require('passport-google-id-token')

passport.use(
  new GoogleTokenStrategy({
    clientId: "827944169415-416idnak4qdkql3piho5q3a5a9ngb611.apps.googleusercontent.com"
  },
  async function(parsedToken: any, googleId: string, done: Function) {
    const {payload} = parsedToken
    try {
      let user = await User.findOne({email: payload.email}).exec()
      if(user) {
        return done(null,user)
      }
      user = await User.create({
        email: payload.email,
      })
      done(null, user)
    } catch(error) {
        done(error)
    }
  }
  ) 
)
