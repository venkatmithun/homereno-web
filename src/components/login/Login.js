import React from 'react';
import facebook from '../../images/facebook.png';
import google from '../../images/google.png';
import { AppConstants } from '../../config/AppConstants';
import { TokenStorageService } from '../../state/middleware/TokenService';
import { UserService } from '../../state/middleware/UserService';
import { AuthService } from '../../state/middleware/AuthService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../state/ducks/user';
import {
  AppBar,
  Button,
  Divider,
  InputBase,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Email, Facebook } from '@material-ui/icons';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.errorMessage = 'error';
    this.googleURL = AppConstants.GOOGLE_AUTH_URL;
    this.facebookURL = AppConstants.FACEBOOK_AUTH_URL;
    this.tokenStorage = TokenStorageService;
    this.userService = UserService;
    this.authService = AuthService;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  componentDidMount() {
    // this.tokenStorage.signOut();
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token'); //
    console.log('token', token);
    const { user } = this.props;
    const error = '';
    if (user.token) {
      this.props.history.push('/home');
    } else if (token) {
      this.props.saveToken({ token: token, getUser: true });
    } else {
      this.errorMessage = error;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.token) {
      nextProps.history.push('/home');
    }
    return {
      ...prevState,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        username: this.username.current.value,
        password: this.password.current.value,
      },
      () => {
        this.props.login(this.state);
      }
    );
  }

  render() {
    const { user } = this.props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eee',
        }}
      >
        <div
          style={{
            position: 'fixed',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            height: '70px',
            width: '100%',
            top: 0,
            fontWeight: 'bold',
            backgroundColor: 'rgb(29, 67, 84)',
          }}
        >
          Home Reno
        </div>
        <form
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '20px 80px 40px 80px',
            border: '1px solid #d3d3d3',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            width: '400px',
            position: 'relative',
          }}
          onSubmit={this.handleSubmit}
        >
          <p style={{ fontWeight: 'bold', fontSize: '24px' }}>
            Log in and get to work
          </p>
          <TextField
            id="outlined-full-width"
            label=""
            style={{ margin: 8 }}
            placeholder="Username or Email"
            // helperText="Full width!"
            fullWidth
            inputRef={this.username}
            defaultValue={this.state.username}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label=""
            style={{ margin: 8 }}
            placeholder="Password"
            fullWidth
            type="password"
            inputRef={this.password}
            defaultValue={this.state.password}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              margin: '10px 0px 10px 0px',
              backgroundColor: 'rgb(0, 131, 41)',
              textTransform: 'none',
            }}
            color="primary"
            fullWidth
          >
            Continue
          </Button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '20px 0px',
            }}
          >
            <div
              style={{
                borderBottom: '1px solid #d3d3d3',
                width: '100%',
              }}
            />
            <span
              style={{
                padding: '0 10px 0 10px',
                width: 'auto',
                color: 'gray',
                fontSize: '14px',
              }}
            >
              or
            </span>
            <div style={{ borderBottom: '1px solid #d3d3d3', width: '100%' }} />
          </div>
          <Button
            variant="contained"
            style={{
              margin: '10px 0px 10px 0px',
              backgroundColor: 'rgb(66, 133, 244)',
              textTransform: 'none',
              color: '#ffffff',
            }}
            fullWidth
            startIcon={<Email />}
            href={AppConstants.GOOGLE_AUTH_URL}
          >
            Sign In with Google
          </Button>
          <hr
            style={{
              width: '100%',
              position: 'absolute',
              bottom: '23%',
              color: '#eee',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '70px 0px 20px 0px',
            }}
          >
            <div
              style={{
                borderBottom: '1px solid #d3d3d3',
                width: '29%',
              }}
            />
            <span
              style={{
                padding: '0 10px 0 10px',
                width: 'auto',
                color: 'gray',
                fontSize: '14px',
              }}
            >
              New to Home Reno?
            </span>
            <div style={{ borderBottom: '1px solid #d3d3d3', width: '29%' }} />
          </div>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={'/signup'}
            style={{
              margin: '10px 0px 10px 0px',
              backgroundColor: '#ffffff',
              textTransform: 'none',
              color: 'rgb(0, 131, 41)',
              width: '50%',
            }}
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch,
    ...bindActionCreators(
      {
        login: userActions.login,
        saveToken: userActions.saveToken,
        fetchUser: userActions.fetchUser,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.userState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
