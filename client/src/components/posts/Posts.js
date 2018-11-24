import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../UI/Spinner';
import { handleGetPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetPosts());
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if ((posts === null, loading)) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(Posts);
