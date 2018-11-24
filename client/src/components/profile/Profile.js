import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleGetCurrentProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../UI/Spinner';

class Profile extends Component {
  componentDidMount() {
    this.props.match.params.handle &&
      this.props.dispatch(
        handleGetCurrentProfileByHandle(this.props.match.params.handle)
      );
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="/profiles"
                      className="btn btn-light mb-3 float-left"
                    >
                      Back To Profiles
                    </Link>
                  </div>

                  <div className="col-6" />
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds />
                <ProfileGithub />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
