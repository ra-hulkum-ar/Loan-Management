const sequelize = require('../config/db');
const User = require('./user.model');
const Loan = require('./loan.model');

User.initModel(sequelize);
Loan.initModel(sequelize);

User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Loan };
