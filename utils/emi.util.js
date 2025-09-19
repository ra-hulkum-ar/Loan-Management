function calculateEMI(principal, annualRatePercent, months) {
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return principal / months;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return numerator / denominator;
}

module.exports = { calculateEMI };
