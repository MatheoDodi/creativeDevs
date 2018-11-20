import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLoginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

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
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.dispatch(handleLoginUser(user));
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your <span className="text-danger">creativeDev</span>{' '}
                account
              </p>
              <form onSubmit={this.formSubmitHandler}>
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

export default connect(mapStateToProps)(Login);
