const { Post } = require('../models');

const postData = [
    {
      "name": "The First Post",
      "description": "This is the first post of the Tech Blog."
    },
    {
      "name": "The Second Post",
      "description": "This is the first post of the Tech Blog."
    },
    {
      "name": "The Third Post",
      "description": "This is the first post of the Tech Blog."
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;