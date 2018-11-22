import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner';
import { handleGetAllProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetAllProfiles());
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log(profiles, loading);
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(prof => (
          <ProfileItem profile={prof} key={prof._id} />
        ));
      } else {
        profileItems = <h4>No profiles found..</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profiles);
