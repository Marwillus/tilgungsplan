import { Injectable, Logger } from '@nestjs/common';

import { RepaymentFormData, RepaymentSchedule } from './types';

@Injectable()
export class RepaymentService {
  private readonly logger = new Logger(RepaymentService.name);

  calculateRepaymentPlan(formData: RepaymentFormData): RepaymentSchedule[] {
    const {
      loanContribution,
      interestRate,
      repaymentType,
      repaymentRate,
      interestPeriod,
    } = formData;

    const repaymentPlan: RepaymentSchedule[] = [];

    let remainingLoan = loanContribution;
    let year = 1;

    if (interestPeriod) {
      for (let index = 0; index < interestPeriod; index++) {
        // Calculate interest for the current year
        const interest = remainingLoan * (interestRate / 100);

        // Calculate repayment amount for the current year based on repayment type
        let repaymentAmount = 0;
        if (repaymentType === 'fixed') {
          repaymentAmount = repaymentRate;
        } else if (repaymentType === 'percentage') {
          repaymentAmount = remainingLoan * (repaymentRate / 100);
        }

        // Ensure repayment amount does not exceed remaining loan
        repaymentAmount = Math.min(repaymentAmount, remainingLoan);

        // Deduct repayment amount from remaining loan
        remainingLoan -= repaymentAmount;

        // Add the details to repayment plan
        repaymentPlan.push({
          year,
          repaymentAmount,
          interestAmount: interest,
          principalAmount: repaymentAmount - interest,
          remainingLoan,
        });

        // Move to the next year
        year++;
      }
    }

    this.logger.log(repaymentPlan);

    return repaymentPlan;
  }
}
