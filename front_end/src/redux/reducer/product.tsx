import {
  SEND_DATA,
  SEND_SINGLE_PRODUCT,
  SEND_FILTERED_PRODUCTS,
  ProductState,
  ProductActions,
} from '../../type'

const initalState: ProductState = { 
  products:[],
  singleProduct: {
    _id: '',
    name: '',
    image: '',
    category: '',
    variant: '',
    shortDescription: '',
    longDescription: '',
    price: 0,
  },
  filteredProducts: []
}

const productReducer = (state = initalState, action: ProductActions): ProductState => {
  switch(action.type) {
    case SEND_DATA: 
      return {
        ...state,
        products: action.payload.products
      }

    case SEND_SINGLE_PRODUCT: 
      return {
        ...state,
        singleProduct: action.payload.product
      }
    
    case SEND_FILTERED_PRODUCTS: 
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts
    }

    default: 
      return state
  }
  
}

export default productReducer