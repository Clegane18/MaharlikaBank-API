const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize = new Sequelize('personalproject', 'postgres', 'webdeveloper18', {
  host: 'localhost',
  dialect: 'postgres',
});
module.exports = sequelize;