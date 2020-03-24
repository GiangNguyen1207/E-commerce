import axios from 'axios' 
import { useHistory } from 'react-router';

export const useUserService: any = () => {
  //const login = () => console.log('Hello')
  const history = useHistory()
  const signUp = async(
    e: React.FormEvent<HTMLFormElement>,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
    ) => {
      e.preventDefault()
      try {
        const res = await axios.post('http://localhost:3000/api/v1/users/signUp', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      })
    
      if(res.data.message === 'Success') {
        return (
          history.push('/user/signIn')
        )
      } 
        } catch(error) {
            alert('Username or email is already registered. Please sign in or choose another username and email')
        }
      }
  const login = () => console.log('hello')
    return { signUp, login }
  };

  
  