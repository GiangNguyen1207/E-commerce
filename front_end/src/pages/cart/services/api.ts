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
  },

  async getCart(userId: string) {
    return await axios.get(`http://localhost:3000/api/v1/users/cart/${userId}`)
      .then(res => res.data)
  }, 

  async deleteProduct(userId: string, productId: string) {
    return await axios
      .delete(`http://localhost:3000/api/v1/users/cart/${userId}`, 
        {
          data: {
            userId,
            productId
          }
        })
      .then(res => res.data)
  },

  async increaseQuantity(userId: string, productId: string) {
    return await axios
      .put(`http://localhost:3000/api/v1/users/cart/increase/${userId}`,
        {
          userId: userId,
          productId: productId
        })
      .then(res => res.data)
  },

  async decreaseQuantity(userId: string, productId: string) {
    return await axios
      .put(`http://localhost:3000/api/v1/users/cart/decrease/${userId}`,
        {
          userId: userId,
          productId: productId
        })
      .then(res => res.data)
  },

  async addProductToFavoriteList(userId: string, productId: string) {
    return await axios
      .post(`http://localhost:3000/api/v1/users/favorite/${userId}`, 
      {
        userId: userId,
        productId: productId
      })
      .then(res => res.data)
  }
}