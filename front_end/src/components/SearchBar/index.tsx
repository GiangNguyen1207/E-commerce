import React from 'react'; 
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './styles.css'

type Props = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      marginLeft: '20px',
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      }
    }
  }),
);

const SearchBar = ({ handleSearch }: Props) => {
  const classes = useStyles()

  return(
    <div className='search'>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Button >
            <SearchIcon />
          </Button> 
        </div>
        <InputBase 
          style={{border:'1px solid #000000', marginLeft: '25px', width: '50%'}}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearch} 
        />
      </div>
    </div>
  )
}

export default SearchBar 