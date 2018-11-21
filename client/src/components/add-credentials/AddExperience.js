import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
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
    console.log(this.state);
  };

  selectCurrentHandler = () => {
    this.setState(prevState => ({
      current: !prevState.current,
      disabled: !prevState.disabled
    }));
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;
    const newExp = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    };

    this.props.dispatch(handleAddExperience(newExp, this.props.history));
  };

  render() {
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.formSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.company &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.title && (
                    <small className="invalid-feedback">
                      {this.state.errors.title}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.company &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.company && (
                    <small className="invalid-feedback">
                      {this.state.errors.company}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.formInputHandler}
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="from"
                    name="from"
                    value={this.state.from}
                    onChange={this.formInputHandler}
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="to"
                    name="to"
                    value={this.state.to}
                    onChange={this.formInputHandler}
                    disabled={this.state.disabled}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    id="current"
                    onChange={this.selectCurrentHandler}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.formInputHandler}
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
                  </small>
                </div>
                <input
                  type="submit"
                  className="btn btn-danger btn-block mt-4 mb-5"
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

export default connect(mapStateToProps)(withRouter(AddExperience));
