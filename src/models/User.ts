import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type UserDocument = Document & {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  forgotPassword: object
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
    type: Object,
    required: false,
    properties: {
      token: String,
      timeOfCreated: Date.now(),
      numberOfMs: Number
    }
  }
})
userSchema.plugin(uniqueValidator)

export default mongoose.model<UserDocument>('User', userSchema)