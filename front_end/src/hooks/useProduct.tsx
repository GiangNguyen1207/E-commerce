import { useEffect, useState } from 'react'

// import { useDispatch } from 'react-redux';
// import axios from 'axios'

// import { Product } from '../type';
// import { sendData } from '../redux/actions/product'
// import { useUserService } from '../services/userService';

// const useProduct = (id?: string) => {
//   const dispatch = useDispatch()
//   const [productList, setProductList] = useState<Product[]>([])
//   const [error, setError] = useState(null)
//   const [details, setDetails] = useState()
//   const { getCart } = useUserService('', dispatch)

//   const userId = localStorage.getItem('userId')

//   useEffect(() => {
//     const fetchData = async() => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/v1/products/')
//         setProductList(res.data)
//       } catch(err) {
//         setError(err)
//         console.log(err)
//       }
//     };
//     fetchData()
//   }, [])
//   dispatch(sendData(productList))
    
//   useEffect(() => {
//     const getDetails = async() => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`)
//         setDetails(res.data)
//       } catch(err) {
//         console.log(err)
//       }
//     };
//     getDetails()
//   }, [id])

//   useEffect(() => {
//     getCart(userId)
//   },[])

//   return { productList, details }
// }

// export default useProduct