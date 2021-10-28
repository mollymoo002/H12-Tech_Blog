const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('__________________');
  try {
    // Get all projects and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: Comment
        },
      ],
    });

     res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});