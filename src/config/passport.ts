import passport from 'passport'

import User from '../models/User'

const GoogleTokenStrategy = require('passport-google-id-token')

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<any, any>((id, done) => {
  User.findById(id).then((user) => done(user))
})

passport.use(
  new GoogleTokenStrategy(
    {
      clientId:
        '827944169415-416idnak4qdkql3piho5q3a5a9ngb611.apps.googleusercontent.com',
    },
    async function (parsedToken: any, googleId: string, done: Function) {
      const { payload } = parsedToken
      try {
        let user = await User.findOne({ email: payload.email }).exec()
        if (user) {
          return done(null, user)
        }
        user = await User.create({
          email: payload.email,
          username: payload.name,
          firstName: payload.given_name,
          lastName: payload.family_name,
          password: payload.name,
          key: payload.email,
          favoriteList: [
            {
              productId: '',
              productName: '',
              productVariant: '',
              image: '',
              price: 0,
            },
          ],
          forgotPassword: {
            token: '',
            timeOfCreated: 0,
            timeStamp: 0,
          },
          cart: [
            {
              productName: '',
              productId: '',
              productVariant: '',
              price: 0,
              quantity: 0,
            },
          ],
        })
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
