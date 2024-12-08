const Sequelize = require('sequelize');

const sequelize = new Sequelize('Prasanth', 'root', 'Backend', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
