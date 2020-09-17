import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

type PasswordToken = {
  token: string;
  timeOfCreated: number;
  timeStamp: number;
}

type CartType = {
  productName: string;
  productVariant: string;
  productId: string;
  price: number;
  quantity: number;
}

type FavoriteList = {
  productId: string;
  productName: string;
  productVariant: string;
  price: number;
}

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  username: string;
  key: string;
  email: string;
  password: string;
  favoriteList: FavoriteList[];
  forgotPassword: PasswordToken;
  cart: CartType[];
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
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteList: [
    {
      productId: String,
      productName: String,
      productVariant: String,
      price: Number,
    },
  ],
  forgotPassword: {
    token: String,
    timeOfCreated: Number,
    timeStamp: Number,
  },
  cart: [
    {
      productName: Object,
      productId: String,
      productVariant: String,
      quantity: Number,
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document: Document, returnedObject: any) => {
    delete returnedObject._v
    delete returnedObject.password
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
