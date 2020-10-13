import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

import { fetchAllProducts } from 'pages/productList/redux/actions'
import { Product } from 'pages/productList/redux/types'
import { useHistory } from 'react-router'

type Props = {
  products: Product[]
}

const useStyles = makeStyles((theme) =>
  createStyles({
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
  })
)

const Pages = ({ products }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  let totalPages: number
  if (products.length % 9 === 0) {
    totalPages = products.length / 9
  } else totalPages = Math.floor(products.length / 9) + 1

  const handleChange = (event: React.ChangeEvent<any>, page: number) => {
    history.push(`/products/?page=${page}`)
    dispatch(fetchAllProducts())
  }

  return (
    <Pagination
      count={totalPages}
      color="secondary"
      className={classes.pagination}
      onChange={handleChange}
    />
  )
}

export default Pages
