import { connect } from 'react-redux';
import React from 'react';
import { userActions } from '../../state/ducks/user';
import { bindActionCreators } from 'redux';
import Category from './Category';
import Contractor from './Contractor';
import Header from '../header/Header';
import _ from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        'Plumbing',
        'Electric',
        'Painting',
        'Flooring',
        'HVAC',
        'Roofing',
        'Landscaping',
        'Home Cleaning',
      ],
      contactors: ['person 1', 'person 2', 'person 3', 'person 4'],
    };
  }

  render() {
    const { categories, contactors } = this.state;
    const { user, logOut } = this.props;
    return (
      <div>
        <Header user={user} logOut={logOut} />
        <div style={{ padding: '10px' }}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((c, idx) => (
              <Category
                name={c}
                key={idx}
                user={user}
                history={this.props.history}
              />
            ))}
          </div>
          <p>Find contractors near you</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            {contactors.map((c, idx) => (
              <Contractor name={c} key={idx} />
            ))}
          </div>
          {!_.isEmpty(user.jobs.painting) && (
            <div>
              <h1>Paint jobs posted</h1>
              {user.jobs.painting.map((rooms, idx) => {
                return (
                  <p key={idx}>
                    Paint Job {idx + 1} for {rooms.length}
                  </p>
                );
              })}
            </div>
          )}
          <div>
            <h2>How it works?</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
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
  console.log(state);
  return {
    user: state.userState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
