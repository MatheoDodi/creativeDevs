const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');
// Profile Model
const Profile = require('../../models/Profile');

// Loading Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts
// Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ noPostFound: 'No post found with that ID' })
    );
});

// @route GET api/posts/:id
// Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: 'No post found with that ID' })
    );
});

// @route POST api/posts
// Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check client sided Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for Post Owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: 'User not authorized' });
          }

          // Delete
          post
            .remove()
            .then(() => res.json({ success: 'Post successfully removed' }));
        })
        .catch(err => res.status(404).json({ postNotFond: 'No Post found' }));
    });
  }
);

// @route POST api/posts/like/:id
// Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if user had liked
          const hasLiked = post.likes.some(
            like => like.user.toString() === req.user.id
          );
          if (hasLiked) {
            return res
              .status(400)
              .json({ alreadyLiked: 'User already liked this post' });
          }

          // Add User id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNotFond: 'No Post found' }));
    });
  }
);

// @route POST api/posts/unlike/:id
// Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if user had liked
          const hasLiked = post.likes.some(
            like => like.user.toString() === req.user.id
          );
          if (!hasLiked) {
            return res
              .status(400)
              .json({ notLiked: 'You have not yet liked this post' });
          }

          // Get Remove Index

          const removeIndex = post.likes
            .map(post => post.user.toString())
            .indexOf(req.user.id);

          // Splice index out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNotFound: 'No Post found' }));
    });
  }
);

// @route POST api/posts/comment/:id
// Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check client sided Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Post found' }));
  }
);

// @route POST api/posts/comment/:id/:comm_id
// Private
router.delete(
  '/comment/:id/:comm_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newCommentsArr = post.comments.filter(
          comm => comm.id.toString() !== req.params.comm_id
        );
        if (newCommentsArr.length === post.comments.length) {
          return res.status(400).json({ noComment: 'Comment does not exist' });
        }
        post.comments = newCommentsArr;

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Post found' }));
  }
);

module.exports = router;
