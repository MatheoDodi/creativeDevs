import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const experience = profile.experience[0] && (
      <p>
        {' '}
        {`${profile.experience[0].title} at ${
          profile.experience[0].company
        }`}{' '}
      </p>
    );

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src={profile.user.avatar}
              alt={`${profile.user.name}'s avatar`}
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            {experience}
            <p>{profile.location}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
