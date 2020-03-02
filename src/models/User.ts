import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

type PasswordToken = {
  token: string,
  timeOfCreated: number,
  numberOfMs: number,
}

export type UserDocument = Document & {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  forgotPassword: PasswordToken
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  forgotPassword: {
    token: String,
    timeOfCreated: {
      type: Number,
    },
    numberOfMs: Number,
  }
})

userSchema.plugin(uniqueValidator)

export default mongoose.model<UserDocument>('User', userSchema)