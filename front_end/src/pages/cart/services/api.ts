import axios from 'axios'

export default {
  async addProductToCart(userId: string, productName: string, productVariant: string, productId: string) {
    return await axios
      .post(`http://localhost:3000/api/v1/users/cart/${userId}`, 
    {
      userId: userId,
      productName: productName,
      productVariant: productVariant,
      productId: productId
    }) 
      .then(res => res.data)
  }
}