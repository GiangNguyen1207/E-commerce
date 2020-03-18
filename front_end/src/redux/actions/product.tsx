import {
  Product,
  SEND_DATA,
  SendDataToStore,
} from '../../type'


export default function sendData(products: Product[]) : SendDataToStore {
  return {
    type: SEND_DATA,
    payload: {
      products
    }
  }
}