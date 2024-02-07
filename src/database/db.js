const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 

const dbPassword = process.env.DB_PASSWORD;

module.exports = sequelize = new Sequelize('maharlikaBankDB', 'postgres', dbPassword, {
  host: 'localhost',
  dialect: 'postgres',
  timezone: '+08:00',
   logging: false, 
  //Set the logging to true if need for debugging purposes
});

