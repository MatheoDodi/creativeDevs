import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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
                <Link to="register" className="btn btn-lg btn-danger mr-3">
                  Sign Up
                </Link>
                <Link to="login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
