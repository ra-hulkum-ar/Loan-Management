const { Loan, User } = require('../models');
const { calculateEMI } = require('../utils/emi.util');

async function applyLoan(req, res) {
  try {
    const userId = req.user.id;
    const { principal, annualInterestRate, tenureMonths } = req.body;
    if (!principal || !annualInterestRate || !tenureMonths) {
      return res.status(400).json({ message: 'principal, annualInterestRate, tenureMonths required' });
    }
    const emi = calculateEMI(Number(principal), Number(annualInterestRate), Number(tenureMonths));
    const loan = await Loan.create({ userId, principal, annualInterestRate, tenureMonths, emi });
    return res.status(201).json(loan);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getMyLoans(req, res) {
  try {
    const loans = await Loan.findAll({ where: { userId: req.user.id }, order: [['appliedOn', 'DESC']] });
    return res.json(loans);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getAllLoans(req, res) {
  try {
    const loans = await Loan.findAll({ order: [['appliedOn', 'DESC']], include: [{ model: User, attributes: ['username'] }] });
    return res.json(loans);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function approveLoan(req, res) {
  try {
    const loanId = req.params.id;
    const loan = await Loan.findByPk(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    loan.status = 'APPROVED';
    await loan.save();
    return res.json(loan);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { applyLoan, getMyLoans, getAllLoans, approveLoan };
