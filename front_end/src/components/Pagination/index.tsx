import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

import { fetchAllProducts } from 'pages/productList/redux/actions'

type Props = {
  totalPages: number
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

const Pages = ({ totalPages }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<any>, page: number) => {
    dispatch(fetchAllProducts(page))
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
