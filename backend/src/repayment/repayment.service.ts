import { Injectable } from '@nestjs/common';

import { RemainingInstances, RepaymentFormData, RepaymentResult, RepaymentSchedule } from './types';

@Injectable()
export class RepaymentService {
  // private readonly logger = new Logger(RepaymentService.name);

  calculateRepaymentPlan(formData: RepaymentFormData): RepaymentResult {
    const {
      loanContribution,
      interestRate,
      repaymentRateInPercent,
      repaymentRateInCash,
      interestPeriod,
    } = formData;

    const repaymentSchedule: RepaymentSchedule[] = [];

    let remainingLoan = loanContribution;
    let interestAmountSum = 0;
    let year = 1;

    if (interestPeriod) {
      for (let index = 0; index < interestPeriod; index++) {
        // Calculate interest for the current year
        const interest = remainingLoan * (interestRate / 100);

        let repaymentAmount = repaymentRateInPercent;
        // Ensure repayment amount does not exceed remaining loan
        repaymentAmount = Math.min(repaymentAmount, remainingLoan);

        // Deduct repayment amount from remaining loan
        remainingLoan -= repaymentAmount;

        interestAmountSum += interest;

        // Add the details to repayment plan
        repaymentSchedule.push({
          year,
          repaymentAmount,
          interestAmount: interest,
          principalAmount: repaymentAmount - interest,
          remainingLoan,
        });

        // Move to the next year
        year++;

        if (remainingLoan < 0) return;
      }

      if (remainingLoan <= 0) {
        const remainingInstances: RemainingInstances = {
          remainingSum: remainingLoan,
          amountPaid: loanContribution - remainingLoan,
          amountInterest: interestAmountSum,
          // @TODO add calculation for rest duration with same data basis
          calculatedRestDuration: undefined,
        };
        return { initialData: formData, repaymentSchedule, remainingInstances };
      }

      while (remainingLoan > 0 || year > 100) {
        remainingLoan = repaymentRateInCash * (interestPeriod - year);
        const interest = remainingLoan * (interestRate / 100);
        let repaymentAmount = repaymentRateInPercent;
        // Ensure repayment amount does not exceed remaining loan
        repaymentAmount = Math.min(repaymentAmount, remainingLoan);

        repaymentSchedule.push({
          year,
          repaymentAmount,
          interestAmount: interest,
          principalAmount: repaymentAmount - interest,
          remainingLoan,
        });
        year++;
      }

      return { initialData: formData, repaymentSchedule };
    }
  }
}

// RS = Restschuld
// T = Tilgungsrate
// n = Tilgungsdauer
// t = Jahr der zu berechnenden Restschuld
// Die Formel lautet RS = T * (n – t).
