import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

export default function useAuth() {
  const { token, user } = useSelector((state: RootState) => ({
    token: state.auth.token,
    user: state.auth.user
  }))

  return {
    token, 
    user
  }
}