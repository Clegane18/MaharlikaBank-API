const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize = new Sequelize('maharlikaBankDB', 'postgres', 'webdeveloper18', {
  host: 'localhost',
  dialect: 'postgres',
  timezone: '+08:00',
  logging: true, 
});

module.exports = sequelize;
