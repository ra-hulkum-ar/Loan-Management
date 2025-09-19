const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'loan_db',
  process.env.DB_USER || 'loan_user',
  process.env.DB_PASS || 'loan_pass',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
