import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row mt-5 pt-5">
              <div className="col-md-12 text-center">
                <h1 className="display-4 mb-4 text-danger font-weight-bold">
                  creativeDevs <br />
                  <span className="text-light subtitle font-weight-light">
                    for Developers by Developers
                  </span>
                </h1>
                <h2 className="lead mb-5 text-secondary">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </h2>
                <a href="register.html" className="btn btn-lg btn-danger mr-3">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
