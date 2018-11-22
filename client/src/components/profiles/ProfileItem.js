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

    let skills = [];
    if (profile.skills.length > 3) {
      for (let i = 0; i < 3; i++) {
        skills.push(
          <li class="list-group-item">
            <i class="fa fa-check pr-1 mr-2" />
            {profile.skills[i].trim()}
          </li>
        );
      }
      skills.push(
        <li class="list-group-item">
          <i class="fa fa-check pr-1 mr-2" />
          {profile.skills.length - 3} more skills
        </li>
      );
    } else {
      skills = profile.skills.map(skill => (
        <li class="list-group-item">
          <i class="fa fa-check pr-1 mr-2" />
          {skill}
        </li>
      ));
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="row"
        >
          <div className="col-6 col-md-6 col-lg-2">
            <img
              className="rounded-circle"
              src={profile.user.avatar}
              alt={`${profile.user.name}'s avatar`}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            {experience}
            <p>{profile.location}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-danger">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block ml-5">
            <h4>Skill Set</h4>
            <ul className="list-group">{skills}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
