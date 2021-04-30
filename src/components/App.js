import '../styles/App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Navigation } from './Navigation';
import Home from './home/Home';
import Login from './login/Login';
import Signup from './signup/Signup';
// import PrivateRoute from './reusableComponents/PrivateRoute';
import { connect } from 'react-redux';
import PaintingForm from './painting/PaintingForm';
import { bindActionCreators } from 'redux';
import { userActions } from '../state/ducks/user';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, logOut } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/renoweb">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/painting-form"
            render={(props) => (
              <PaintingForm user={user} logOut={logOut} isAuthed={true} />
            )}
          />
          {/* <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch,
    ...bindActionCreators({ logOut: userActions.logOut }, dispatch),
  };
};

const mapStateToProps = (state) => {
  console.log('app', state);
  return {
    user: state.userState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
