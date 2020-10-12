import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

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

  const handleChange = (event: React.ChangeEvent<any>, page: Number) => {
    console.log(page)
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
