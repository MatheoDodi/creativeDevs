import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDeleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  deleteCommentHandler = (postId, commentId) => {
    this.props.dispatch(handleDeleteComment(postId, commentId));
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.name === auth.user.name && (
              <button
                onClick={() => this.deleteCommentHandler(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);
