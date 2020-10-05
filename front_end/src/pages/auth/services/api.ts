import axios from 'axios'

import { User } from 'pages/auth/redux/types'

export default {
  async signup(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    return await axios
      .post('http://localhost:3000/api/v1/users/signUp', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => res.data)
  },

  async signin(userInfo: string, password: string) {
    return await axios
      .post('http://localhost:3000/api/v1/users/signIn', {
        userInfo: userInfo,
        password: password,
      })
      .then((res) => res.data)
  },

  async googleSignin(id_token: string) {
    return await axios
      .post('http://localhost:3000/api/v1/users/google-authenticate', {
        id_token: id_token,
      })
      .then((res) => res.data)
  },

  async updateUserProfile(userId: string, updateUser: Partial<User>) {
    return await axios
      .put(`http://localhost:3000/api/v1/users/${userId}`, {
        userId: userId,
        updateUser: updateUser,
      })
      .then((res) => res.data)
  },

  async resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    return await axios
      .put(`http://localhost:3000/api/v1/users/changePassword/${userId}`, {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((res) => res.data)
  },

  async forgotPassword(email: string) {
    return await axios
      .post('http://localhost:3000/api/v1/users/forgotPassword', {
        email: email,
      })
      .then((res) => res.data)
  },
}
