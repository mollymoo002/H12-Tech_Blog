const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  console.log('__________________');
  try {
    const commentData = await Comment.findAll({});

     res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  console.log('__________________');
  try {
    const commentData = await Comment.findByPk(req.params.id, {});

     res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(commentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateComment = await Comment.update(req.params.id, {
      comment_text: req.body.comment_text
    })

    if (!updateComment) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;