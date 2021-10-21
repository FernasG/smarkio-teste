const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config);

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(err) {
        console.error('Unable to connect to the database:', err);
    }
})();

module.exports = sequelize;
