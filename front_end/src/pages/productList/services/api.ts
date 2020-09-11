import axios from 'axios'

export default {
  async fetchAllProducts() {
    return await axios.get('http://localhost:3000/api/v1/products/')
      .then(res => res.data)
  },

  async findProducts(query: string) {
    return await axios.get(`http://localhost:3000/api/v1/products/?search=${query}`)
      .then(res => res.data)
  },

  async fetchOneProduct(productId: string) {
    return await axios.get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(res => res.data)
  },
}