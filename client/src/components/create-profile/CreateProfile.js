import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleCreateProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

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

  showSocialInput = () => {
    const { twitter, facebook, youtube, linkedin, instagram } = this.state;

    if (!twitter && !facebook && !youtube && !linkedin && !instagram) {
      this.setState(prevState => ({
        displaySocialInputs: !prevState.displaySocialInputs
      }));
    }
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state;
    const newProfile = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };
    this.props.dispatch(handleCreateProfile(newProfile, this.props.history));
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.formSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.handle &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Profile handle"
                    name="handle"
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.handle && (
                    <small className="invalid-feedback">
                      {this.state.errors.handle}
                    </small>
                  )}
                  <small className="form-text text-muted">
                    A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)
                    e.g. creativedevs.com/profile/example
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className={`${this.state.errors.status &&
                      'is-invalid'} form-control form-control-lg`}
                    name="status"
                    onChange={this.formInputHandler}
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  {this.state.errors.status && (
                    <small className="invalid-feedback">
                      {this.state.errors.status}
                    </small>
                  )}
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Company"
                    name="company"
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Website"
                    name="website"
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    Could be your own or a company website
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    City & state suggested (eg. Boston, MA)
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.skills &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Skills"
                    name="skills"
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.skills && (
                    <small className="invalid-feedback">
                      {this.state.errors.skills}
                    </small>
                  )}
                  <small className="form-text text-muted">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Github Username"
                    name="githubusername"
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    If you want your latest repos and a Github link, include
                    your username
                  </small>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="A short bio of yourself"
                    name="bio"
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>
                <div className="mb-3">
                  <button
                    onClick={this.showSocialInput}
                    type="button"
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {this.state.displaySocialInputs && (
                  <div className="mb-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-twitter" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        onChange={this.formInputHandler}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-facebook" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Facebook Page URL"
                        name="facebook"
                        onChange={this.formInputHandler}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-linkedin" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        onChange={this.formInputHandler}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-youtube" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        onChange={this.formInputHandler}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-instagram" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Instagram Page URL"
                        name="instagram"
                        onChange={this.formInputHandler}
                      />
                    </div>
                  </div>
                )}
                <input
                  type="submit"
                  className="btn btn-danger btn-block mt-4 mb-4"
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
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(CreateProfile));
