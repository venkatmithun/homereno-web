import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { history } from '../../state/ReduxStore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    padding: '0px 50px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'rgb(0, 131, 41)',
  },
  flex: {
    flexGrow: 1,
    display: 'flex',
  },
  search: {
    position: 'relative',
    borderRadius: 100,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: '1px solid #d3d3d3',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(0, 131, 41)',
  },
  inputRoot: {
    color: 'rgb(29, 67, 84)',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  rightNav: {
    display: 'flex',
  },
  buttonLinks: {
    height: '30px',
    marginRight: '20px',
    color: 'rgb(29, 67, 84)',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      boxShadow: 'none',
      color: 'rgb(0, 131, 41)',
    },
  },
  signUp: {
    height: '30px',
    backgroundColor: 'rgb(0, 131, 41)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(0, 131, 41)',
    },
  },
}));

export default function Header({ user, logOut }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
        <div className={classes.flex}>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => {
              console.log(sessionStorage.getItem('auth-token'));
              console.log(sessionStorage.getItem('auth-user'));
              console.log('redux  user', user);
              history.push('/home');
            }}
          >
            Home Reno
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div>
        <div className={classes.rightNav}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLinks}
          >
            How It Works
          </Button>
          {user.token ? (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonLinks}
              >
                {user.displayName}
              </Button>
              <Button
                variant="contained"
                className={classes.signUp}
                color="primary"
                onClick={() => logOut()}
              >
                Sign Out
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonLinks}
                component={Link}
                to={'/login'}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.signUp}
                component={Link}
                to={'/signup'}
              >
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
