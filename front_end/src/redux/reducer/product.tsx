import {
  SEND_DATA,
  ProductState,
  ProductActions
} from '../../type'

const initalState: ProductState = { 
  products:[]
}

const productReducer = (state = initalState, action: ProductActions): ProductState => {
  switch(action.type) {
    case SEND_DATA: 
      return {
        ...state,
        products: action.payload.products
      }

    default: 
      return state
  }
  
}

export default productReducer