const { User } = require('../models');

const users = [
    {
        username: 'Aidan',
        password: 'pass123',
    },
    {
        username: 'Joey',
        password: 'pass123',

    },
    {
        username: 'Molly',
        password: 'pass123',
    },
    {
        username: 'Nazik',
        password: 'pass123',
    },
];

const seedUser = () => User.bulkCreate(users, {individualHooks: true});

module.exports = seedUser;