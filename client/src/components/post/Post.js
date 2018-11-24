import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import PostItem from '../posts/PostItem';
import { handleGetSinglePost } from '../../actions/postActions';
import Comment from './Comment';

class Post extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetSinglePost(this.props.match.params.id));
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post == null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem showActions={false} post={post} />;
    }

    return (
      <div>
        <div class="container" />
        <div class="row">
          <div class="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
            <Comment postId={post._id} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(Post);
