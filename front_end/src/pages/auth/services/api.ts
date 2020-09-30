import axios from 'axios'

export default {
  async signup(firstName: string, lastName: string, username: string, email: string, password: string) {
    return await axios.post('http://localhost:3000/api/v1/users/signUp', {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    })
      .then(res => res.data)
      .catch(error => error.response)
  }, 

  async signin(userInfo: string, password: string) {
    return await axios.post('http://localhost:3000/api/v1/users/signIn', {
      userInfo: userInfo,
      password: password
    })
      .then(res => res.data)
      .catch(error => error.response)
  },

  async googleSignin(id_token: string) {
    return await axios.post('http://localhost:3000/api/v1/users/google-authenticate', {
      id_token: id_token
    })
      .then(res => res.data)
      .catch(error => error.response)
  },

}