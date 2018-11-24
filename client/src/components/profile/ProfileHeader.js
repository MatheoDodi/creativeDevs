import React, { Component } from 'react';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);
    const experience = profile.experience[0] && (
      <p>
        {' '}
        {`${profile.experience[0].title} at ${
          profile.experience[0].company
        }`}{' '}
      </p>
    );
    const prsnlWebsite = (
      <a
        className="text-white p-2"
        href={profile.website}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-globe fa-2x" />
      </a>
    );
    const socialLinks = Object.keys(profile.social).map(social => (
      <a
        key={social}
        className="text-white p-2"
        href={profile.social[social]}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className={`fab fa-${social} fa-2x`} />
      </a>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-danger text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{experience}</p>
              <p>{profile.location}</p>
              <p>
                {prsnlWebsite}
                {socialLinks}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
