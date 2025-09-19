const { DataTypes, Model } = require('sequelize');

class Loan extends Model {
  static initModel(sequelize) {
    Loan.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      principal: { type: DataTypes.DOUBLE, allowNull: false },
      annualInterestRate: { type: DataTypes.DOUBLE, allowNull: false },
      tenureMonths: { type: DataTypes.INTEGER, allowNull: false },
      emi: { type: DataTypes.DOUBLE, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'APPLIED' },
      appliedOn: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
      sequelize,
      modelName: 'Loan',
      tableName: 'loans'
    });
  }
}

module.exports = Loan;
