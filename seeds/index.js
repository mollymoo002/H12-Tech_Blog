const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');
const sequelize = require('../config/connection');

const seedAll = async() => {
  await sequelize.sync({ force: true });
  await seedUsers();
  console.log('\n----- USER SEEDED-----\n');
  await seedPosts();
  console.log('\n----- POSTS SEEDED-----\n');
  await seedComments();
  console.log('\n----- COMMENTS SEEDED-----\n');

  process.exit(0);
};

seedAll();