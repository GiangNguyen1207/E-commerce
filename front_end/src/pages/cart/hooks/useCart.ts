import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

export default function useCart() {
  const cart = useSelector((state: RootState) => state.cart)
  
  return cart
}