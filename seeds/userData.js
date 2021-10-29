const { User } = require('../models');
 
 const userData = [
    {
        "username": "Aidan",
        "password": "pass123"
    },
    {
        "username": "Joey",
        "password": "pass123"
    },
    {
        "username": "Molly",
        "password": "pass123"
    },
    {
        "username": "Nazik",
        "password": "pass123"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;