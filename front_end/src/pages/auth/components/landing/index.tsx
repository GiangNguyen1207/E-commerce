import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'

import { validateToken } from 'pages/auth/redux/actions'

export default function Landing() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      dispatch(validateToken(token, history))
    }
  }, [dispatch, history, token])

  return null
}
