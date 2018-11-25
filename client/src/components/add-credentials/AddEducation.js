import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    this.props.dispatch(handleAddEducation(newEdu, this.props.history));
  };

  render() {
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.formSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.school &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={this.state.school}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.school && (
                    <small className="invalid-feedback">
                      {this.state.errors.school}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.degree &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.degree && (
                    <small className="invalid-feedback">
                      {this.state.errors.degree}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${this.state.errors.fieldofstudy &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="* Field of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.fieldofstudy && (
                    <small className="invalid-feedback">
                      {this.state.errors.fieldofstudy}
                    </small>
                  )}
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={`${this.state.errors.from &&
                      'is-invalid'} form-control form-control-lg`}
                    placeholder="from"
                    name="from"
                    value={this.state.from}
                    onChange={this.formInputHandler}
                  />
                  {this.state.errors.from && (
                    <small className="invalid-feedback">
                      {this.state.errors.from}
                    </small>
                  )}
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

export default connect(mapStateToProps)(withRouter(AddEducation));
