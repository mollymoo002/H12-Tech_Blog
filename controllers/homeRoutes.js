const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const findPosts = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: [{
          model: User,
          attributes: ['username']
        }]
      },
      {
        model: User,
        attributes: ['username']
      }
      ]
    })
    // Serialize data so the template can read it
    const posts = findPosts.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', async (req, res) => {
  try {
    const postbyID = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
        'title',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
    });

    const singlePost = await postbyID
      if(!singlePost) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
      }
      const post = singlePost.get({ plain: true});
      console.log(post);

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post-comments', async (req, res) => {
  try {
    const findComment = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
        'title',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
    });

    const findNewComment = await findComment
    if(!findNewComment) {
      res.status(404).json({ message: 'No post found with this id'});
      return
    }

    const post =  findNewComment.get({ plain: true});

    res.render('posts-comments', { post, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;