import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleRegisterUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({ errors: nextProps.errors }));
    }
  }

  formInputHandler = e => {
    const value = e.target.value;
    const element = e.target.name;
    this.setState(() => ({ [element]: value }));
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.dispatch(handleRegisterUser(newUser, this.props.history));
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your <span className="text-danger">creativeDev</span>{' '}
                account
              </p>
              <form onSubmit={this.formSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.name &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.name && (
                    <small className="invalid-feedback">
                      {this.state.errors.name}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className={`${this.state.errors.email &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.email && (
                    <small className="invalid-feedback">
                      {this.state.errors.email}
                    </small>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`${this.state.errors.password &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.password && (
                    <small className="invalid-feedback">
                      {this.state.errors.password}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`${this.state.errors.password2 &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.password2 && (
                    <small className="invalid-feedback">
                      {this.state.errors.password2}
                    </small>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-danger btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Register));
