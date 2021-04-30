import { Button, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userActions } from '../../state/ducks/user';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: 'Error',
      user: {},
      alignment: 'left',
    };
    this.displayName = React.createRef();
    this.password = React.createRef();
    this.matchingPassword = React.createRef();
    this.email = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        user: {
          displayName: this.displayName.current.value,
          password: this.password.current.value,
          email: this.email.current.value,
          matchingPassword: this.matchingPassword.current.value,
        },
      },
      () => {
        this.props.signup(this.state.user);
      }
    );
  }

  handleAlignment = (event, newAlignment) => {
    this.setState({ alignment: newAlignment });
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 3,
            backgroundColor: 'rgb(29, 67, 84)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '25%',
            }}
          >
            <Link
              to="/home"
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              Home Reno
            </Link>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              right: '20%',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fff' }}>
              Log In
            </Link>
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
              Get your free account
            </p>
            <TextField
              id="outlined-full-width"
              label=""
              style={{ margin: 8 }}
              placeholder="Username"
              // helperText="Full width!"
              fullWidth
              required
              inputRef={this.displayName}
              minLength="3"
              maxLength="20"
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
              placeholder="Email"
              // helperText="Full width!"
              fullWidth
              required
              inputRef={this.email}
              type="email"
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
              // helperText="Full width!"
              fullWidth
              required
              inputRef={this.password}
              minLength="6"
              type="password"
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
              placeholder="Confirm Password"
              // helperText="Full width!"
              fullWidth
              required
              inputRef={this.matchingPassword}
              minLength="6"
              type="password"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <b style={{ padding: '10px' }}>I want to:</b>
            <ToggleButtonGroup
              value={this.state.alignment}
              exclusive
              onChange={this.handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                Hire
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                Work
              </ToggleButton>
            </ToggleButtonGroup>
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
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch,
    ...bindActionCreators({ signup: userActions.signup }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
