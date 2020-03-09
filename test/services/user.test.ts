import request from 'supertest'
import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets';

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    firstName: 'Gigi',
    lastname: 'Nguyen',
    username: 'gigixinhdep',
    email: 'giang.nguyen@integrify.io',
    password: '0123456789'
  }
  const fakeToken = await jwt.sign({user}, JWT_SECRET, {expiresIn: '1h'})
}