import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

type PasswordToken = {
  token: string,
  timeOfCreated: number,
  timeStamp: number,
}

export type UserDocument = Document & {
  firstName: string,
  lastName: string,
  username: string,
  key: string,
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
    timeOfCreated: Number,
    timeStamp: Number,
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document: Document, returnedObject:any) => {
    delete returnedObject._v
    delete returnedObject.firstName
    delete returnedObject.lastName
    delete returnedObject.password
  }
 })

export default mongoose.model<UserDocument>('User', userSchema)