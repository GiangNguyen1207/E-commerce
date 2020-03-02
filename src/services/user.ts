import User, { UserDocument } from '../models/User'
import bcrypt from 'bcrypt'

function createUser(user: UserDocument): Promise<UserDocument> {
  return user.save()
}   
 
function signIn(username: string, password: string): Promise<UserDocument> {
  return User.findOne({username: username})
    .exec()
    .then(async (user) => {
      if(user) {
        const match = await bcrypt.compare(password, user.password)
        if(match) {
          return user
        } throw new Error('Username or password incorrect')
      } 
        throw new Error('Usernam of password incorrect')
      /*if(user && bcrypt.compareSync(password, user.password)) {
        return user
      }
      throw new Error('Username or password incorrect')*/
    })
}

function updateUserProfile(
  userUpdate: Partial<UserDocument>,
  userId: string
  ): Promise<UserDocument> {
    return User.findById(userId)
      .exec()
      .then(user => {
        if(!user) {
          throw new Error(`User ${userId} not found`)
        }
        if(userUpdate.firstName) {
          user.firstName = userUpdate.firstName
        } 
        if(userUpdate.lastName) {
          user.lastName = userUpdate.lastName
        }
        if(userUpdate.email) {
          user.email = userUpdate.email
        }
        return user.save()
      })
}

/*function forgotPassword(username: string, email: string): Promise<UserDocument[]> {
  return User.findOne({email: email})
    .exec()
    .then(user => {
      if(user) {
        if(tokens) {
          delete
        }
        
      }
    })
}*/

export default {
  createUser,
  signIn,
  updateUserProfile
}