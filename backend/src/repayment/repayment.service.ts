import { Injectable } from '@nestjs/common';

import { RemainingInstances, RepaymentFormData, RepaymentResult, RepaymentSchedule } from './types';

@Injectable()
export class RepaymentService {
  // private readonly logger = new Logger(RepaymentService.name);

  calculateRepaymentPlan(formData: RepaymentFormData): RepaymentResult {
    const {
      loanContribution,
      interestRate,
      repaymentRateInCash,
      interestPeriod,
      interestPeriodEnabled,
    } = formData;

    const repaymentSchedule: RepaymentSchedule[] = [];

    let remainingLoan = loanContribution;
    let repaymentRate = repaymentRateInCash;
    let repaymentAmount = 0;
    let repaymentAmountSum = 0;
    let interestAmountSum = 0;
    let year = 1;
    let remainingLoanAfterTime = 0;

    // Calculate repayment plan within a period of time
    for (let index = 0; index < interestPeriod; index++) {
      const interestAmount = Math.ceil((remainingLoan * interestRate) / 100);

      if (remainingLoan < repaymentRate) {
        repaymentRate = remainingLoan + interestAmount;
      }

      repaymentAmount = repaymentRate - interestAmount;

      remainingLoan -= repaymentAmount;

      interestAmountSum += interestAmount;
      repaymentAmountSum += repaymentRate;

      repaymentSchedule.push({
        year,
        interestAmount,
        repaymentRate,
        repaymentAmount,
        remainingLoan,
        interestAmountSum,
        repaymentAmountSum,
      });

      year++;
    }
    remainingLoanAfterTime = remainingLoan;

    // Calculate repayment plan until the loan is fully repaid
    // for now I added a max of 100 years to prevent infinitive loop
    while (remainingLoan > 0 || year > 100) {
      console.log('calculate end');
      const interestAmount = Math.ceil((remainingLoan * interestRate) / 100);

      if (remainingLoan < repaymentRate) {
        repaymentRate = remainingLoan + interestAmount;
      }

      repaymentAmount = repaymentRate - interestAmount;

      remainingLoan -= repaymentAmount;

      if (!interestPeriodEnabled) {
        interestAmountSum += interestAmount;
        repaymentAmountSum += repaymentRate;

        repaymentSchedule.push({
          year,
          interestAmount,
          repaymentRate,
          repaymentAmount,
          remainingLoan,
          interestAmountSum,
          repaymentAmountSum,
        });
      }

      year++;
    }

    const remainingInstances: RemainingInstances = {
      remainingSum: remainingLoanAfterTime,
      amountPaid: repaymentAmountSum,
      amountInterest: interestAmountSum,
      // @TODO add calculation for rest duration with same data basis
      calculatedRestDuration: repaymentSchedule.at(-1)
        ? repaymentSchedule.at(-1)!.year - year
        : 0,
    };

    return { initialData: formData, repaymentSchedule, remainingInstances };
  }
}
