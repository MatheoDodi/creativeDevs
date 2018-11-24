import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../UI/Spinner';

class Posts extends Component {
  render() {
    return (
      <div class="feed">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
