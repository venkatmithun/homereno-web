import { connect } from 'react-redux';
import React from 'react';
import { userActions } from '../../state/ducks/user';
import { bindActionCreators } from 'redux';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p>User</p>;
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch,
    ...bindActionCreators({}, dispatch),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.userState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
