import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User';
import { ForbiddenError } from '../helpers/apiError';
import { JWT_SECRET } from '../util/secrets';
import logger from '../util/logger';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = (req.headers['authorization'] || '').split('Bearer ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const user = await User.findOne({email: decoded.email})
      .exec()
    req.user = user as any
    next()
  } catch(error) {
    logger.error(error)
    return next(new ForbiddenError())
  }
}

