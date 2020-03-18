import {
  CartState,
  CartActions, 
  ADD_PRODUCT,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  NO_PRODUCT
} from '../../type'

const initialState: CartState = {
  productCart: [],
  quantity: 1,
  deleted: 1,
}


const CartReducer = (state = initialState, action: CartActions): CartState => {
  switch(action.type) {
    case ADD_PRODUCT: 
      const addedProduct = action.payload.product
    return {
      ...state,
      productCart: [...state.productCart, addedProduct]
    }

    case INCREASE_PRODUCT: 
      const increaseQuantity = action.payload.quantity
    return {
      ...state,
      quantity: state.quantity + increaseQuantity
    }

    case DECREASE_PRODUCT: 
      const decreaseQuantity = action.payload.quantity
    return {
      ...state,
      quantity: state.quantity - decreaseQuantity
    }

    case REMOVE_PRODUCT: 
      const removedProduct = action.payload.product
    return {
      ...state,
      productCart: state.productCart.filter(p => p.name !== removedProduct.name)
    }

    // case NO_PRODUCT: 
    // return {
    //   ...state,
    //   deleted: action.payload.deleted
    // }

    default:
    return state
  }
}

export default CartReducer