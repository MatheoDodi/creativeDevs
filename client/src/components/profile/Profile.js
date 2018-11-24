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
    return (
      <div>
        <h1>TODO: Profile About</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
