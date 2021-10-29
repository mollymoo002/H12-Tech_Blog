const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            include: {
                model: User,
                attributes: ['username']
            }
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', { 
        posts, 
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/edit/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('editPost', {
        ...post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/new', (req, res) => {
      res.render('newPost');
  });

module.exports = router;