const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Excellent point",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "I never thought of that!",
        user_id: 2,
        post_id: 2 
    },
    {
        comment_text: "I'll have to think about this",
        user_id: 3,
        post_id: 3
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;