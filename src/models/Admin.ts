import mongoose, {Document, mongo} from 'mongoose'

export type AdminDocument = Document & {
   firstName: string,
   lastName: string,
   username: string,
   password: string,
   role: string
}

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rose: {
    type: String,
    required: false,
  }
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)