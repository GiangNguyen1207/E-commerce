import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './styles.css'

type Props = {
  select: string,
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Sort = ({ select, handleChange }: Props) => {
  const classes = useStyles();
  const sortValues = ['None', 'Price (Low to High)', 'Price (High to Low)', 'Name (Asc)', 'Name (Desc)']

  return(
    <div className='sort'>
      <b className='sort-text'>Sort</b>
      <FormControl className={classes.formControl}>
        <Select
          labelId='select-label'
          id='select'
          value={select}
          onChange={handleChange}
        >
          {sortValues.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  )
}

export default Sort