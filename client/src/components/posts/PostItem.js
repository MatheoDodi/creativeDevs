import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  handleDeletePost,
  handleAddLike,
  handleRemoveLike
} from '../../actions/postActions';

class PostItem extends Component {
  state = {
    clicked: ''
  };

  deletePostHandler = id => {
    this.props.dispatch(handleDeletePost(id));
  };

  likePostHandler = id => {
    this.props.dispatch(handleAddLike(id));
  };

  unlikePostHandler = id => {
    this.props.dispatch(handleRemoveLike(id));
    setTimeout(() => this.setState({ clicked: id }), 500);
  };

  render() {
    const { post, auth, errors, showActions } = this.props;
    console.log(post);

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center font-weight-bold">{post.name}</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="col-md-10"
          >
            <p className="lead">{post.text}</p>
            {showActions && (
              <div>
                <button
                  onClick={() => this.likePostHandler(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-info fas fa-thumbs-up" />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.unlikePostHandler(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.name === auth.user.name && (
                  <button
                    onClick={() => this.deletePostHandler(post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
                {errors.notLiked && post._id === this.state.clicked && (
                  <small className="text-danger">{errors.notLiked}</small>
                )}
              </div>
            )}
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

export default connect(mapStateToProps)(PostItem);
