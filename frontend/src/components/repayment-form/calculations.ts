import { RemainingInstances, RepaymentFormData, RepaymentResult, RepaymentSchedule } from './types';

export const calculateRepaymentPlan = (formData: RepaymentFormData): RepaymentResult => {
  const { loanContribution, interestRate, repaymentRateInCash, interestPeriod, interestPeriodEnabled } = formData;

  const repaymentSchedule: RepaymentSchedule[] = [];
  let remainingLoan = loanContribution;
  let repaymentRate = repaymentRateInCash;
  let year = new Date().getFullYear();
  let remainingLoanAfterTime = 0;

  const calculateInterestAmount = (loan: number): number => Math.ceil((loan * interestRate) / 100);

  const updateRepaymentRate = (loan: number, interestAmount: number): number => {
    if (loan < repaymentRate) {
      return loan + interestAmount;
    }
    return repaymentRate;
  };

  const processRepayment = (interestAmount: number): number => {
    if (repaymentRate < interestAmount) {
      throw new Error('Repayment rate is less than interest amount');
    }
    return repaymentRate - interestAmount;
  };

  const calculateRepaymentForYear = (loan: number): RepaymentSchedule => {
    const interestAmount = calculateInterestAmount(loan);
    repaymentRate = updateRepaymentRate(loan, interestAmount);
    const repaymentAmount = processRepayment(interestAmount);
    remainingLoan -= repaymentAmount;
    return {
      year,
      interestAmount,
      repaymentRate,
      repaymentAmount,
      remainingLoan,
      interestAmountSum: interestAmount,
      repaymentAmountSum: repaymentAmount,
    };
  };

  const processInterestPeriod = (): void => {
    for (let index = 0; index < interestPeriod; index++) {
      repaymentSchedule.push(calculateRepaymentForYear(remainingLoan));
      year++;
    }
    remainingLoanAfterTime = remainingLoan;
  };

  const processRemainingLoan = (): void => {
    while (remainingLoan > 0) {
      repaymentSchedule.push(calculateRepaymentForYear(remainingLoan));
      year++;
    }
  };

  if (interestPeriodEnabled) {
    processInterestPeriod();
  } else {
    processRemainingLoan();
  }

  const remainingInstances: RemainingInstances = {
    remainingSum: remainingLoanAfterTime,
    amountPaid: repaymentSchedule.reduce((acc, curr) => acc + curr.repaymentAmount, 0),
    amountInterest: repaymentSchedule.reduce((acc, curr) => acc + curr.interestAmount, 0),
    calculatedRestDuration: repaymentSchedule.length > 0 ? year - repaymentSchedule[repaymentSchedule.length - 1].year - 1 : 0,
  };

  return { initialData: formData, repaymentSchedule, remainingInstances };
};
