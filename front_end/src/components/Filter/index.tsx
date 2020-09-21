import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

import './styles.css'

type Props = {
  filterValues: string[],
  names: string[],
  categories: string[],
  variants: string[],
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  onButtonClick: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
      textTransform: 'capitalize'
    },
    '@media (max-width: 900px)': {
      formControl: {
        marginTop: '30px'
      }
    },
    '@media (max-width: 600px)': {
      formControl: {
        marginTop: '30px'
      }
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    button: {
      textTransform: 'capitalize',
    }
  }),
);

const Filter = ({ filterValues, names, categories, variants, handleChange, onButtonClick }: Props) => {
  const classes = useStyles();
  const inputLabels = ['By name', 'By category', 'By variant'] 
  return (
    <div className='filter'>
      <b>Filter</b>
      {inputLabels.map(label => (
        <FormControl className={classes.formControl} key={label}>
          <InputLabel id="checkbox-label">{label}</InputLabel>
          <Select
          labelId="multiple-select-label"
          id="multiple-select"
          multiple
          value={filterValues}
          onChange={handleChange}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          >
          {label === 'By name' ? (
            names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterValues.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))
          ) : label === 'By category' ? (
            categories.map(category => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={filterValues.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))
          ) : (
            variants.map((variant) => (
              <MenuItem key={variant} value={variant}>
                <Checkbox checked={filterValues.indexOf(variant) > -1} />
                <ListItemText primary={variant} />
              </MenuItem>
          )))}
        </Select>
      </FormControl>
      ))}
      <Button
        onClick={onButtonClick}
        className={classes.button}
        startIcon={<ClearIcon/>}>
        Clear filter
      </Button>
    </div>
  )
}

export default Filter