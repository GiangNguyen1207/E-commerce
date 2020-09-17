import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

import './styles.css'
import useProduct from 'pages/productList/hooks/useProduct';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginLeft: '30px',
      minWidth: 120,
      maxWidth: 300,
    }
  }),
);

const Filter = () => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { allProducts } = useProduct('')
  const names = Array.from(new Set(allProducts.map(p => p.name.split('-')[0])))
  const category = Array.from(new Set(allProducts.map(p => p.category)))
  const variant = Array.from(new Set(allProducts.map(p => p.variant)))

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div className='filter'>
      <b>Filter</b>
      <FormControl className={classes.formControl}>
        <InputLabel id="checkbox-label">By Name</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="checkbox-label">By Category</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          {category.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="checkbox-label">By Variant</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          {variant.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='filter-button'>
        <Button
            startIcon={<ClearIcon/>}
            style={{ textTransform: 'capitalize', padding: '0'}}>
          Clear Filter
        </Button>
      </div>
    </div>
  )
}

export default Filter