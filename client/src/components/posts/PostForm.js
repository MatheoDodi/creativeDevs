import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPost } from '../../actions/postActions';

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({ errors: nextProps.errors }));
    }
  }

  formInputHandler = e => {
    const value = e.target.value;
    this.setState(() => ({ text: value }));
  };

  formSubmitHandler = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.dispatch(handleAddPost(newPost));

    this.setState(() => ({ text: '' }));
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-danger text-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={this.formSubmitHandler}>
              <div className="form-group">
                <textarea
                  className={`${this.state.errors.text &&
                    'is-invalid'} form-control form-control-lg`}
                  placeholder="What's on your mind?"
                  value={this.state.text}
                  onChange={this.formInputHandler}
                />
                {this.state.errors.text && (
                  <small className="invalid-feedback">
                    {this.state.errors.text}
                  </small>
                )}
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(PostForm);
