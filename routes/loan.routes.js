const express = require('express');
const router = express.Router();
const loanCtrl = require('../controllers/loan.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// protected
router.post('/apply', authenticateToken, loanCtrl.applyLoan);
router.get('/my', authenticateToken, loanCtrl.getMyLoans);

// admin endpoints
router.get('/all', authenticateToken, authorizeRole('ADMIN'), loanCtrl.getAllLoans);
router.post('/:id/approve', authenticateToken, authorizeRole('ADMIN'), loanCtrl.approveLoan);

module.exports = router;
