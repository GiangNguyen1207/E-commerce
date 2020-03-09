import { Request, Response, NextFunction } from 'express'
import User from '../models/User';
import { ForbiddenError } from '../helpers/apiError';

export default function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization
    //const {payload} = token
    User.findOne({loginToken: token})
      .exec()
      .then(user => {
        if(!user) {
          throw new Error ('User not found')
        } 
        next()
      })
  } catch(error) {
    next(new ForbiddenError('User is not authorized', error))
  }
}
