import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { RemainingInstances, RepaymentFormData, RepaymentResult, RepaymentSchedule } from './types';

@Injectable()
export class RepaymentService {
  private readonly logger = new Logger(RepaymentService.name);

  calculateRepaymentPlan = (formData: RepaymentFormData): RepaymentResult => {
    const {
      loanContribution,
      interestRate,
      repaymentRate,
      interestPeriod,
      interestPeriodEnabled,
    } = formData;

    const repaymentSchedule: RepaymentSchedule[] = [];
    let remainingLoan = loanContribution;
    let repayment = repaymentRate;
    let year = new Date().getFullYear();
    let remainingLoanAfterTime = 0;
    let interestAmountSum = 0;
    let repaymentAmountSum = 0;

    const calculateInterestAmount = (loan: number): number =>
      Math.ceil((loan * interestRate) / 100);

    const updateRepaymentRate = (
      loan: number,
      interestAmount: number,
    ): number => {
      if (loan < repaymentRate) {
        return loan + interestAmount;
      }
      return repaymentRate;
    };

    const processRepayment = (interestAmount: number): number => {
      // I would prefer to inhibit this behaviour on client-side,
      // but this is a good example for error handling
      if (repaymentRate < interestAmount) {
        throw new BadRequestException({
          "message": "Die Tilgungsrate ist niedriger als der Sollzinssatz.",
          "error": "Wrong Input",
          "statusCode": 400,
        });
      }
      return repaymentRate - interestAmount;
    };

    const calculateRepaymentForYear = (loan: number): RepaymentSchedule => {
      const interestAmount = calculateInterestAmount(loan);
      repayment = updateRepaymentRate(loan, interestAmount);
      const repaymentAmount = processRepayment(interestAmount);
      remainingLoan -= repaymentAmount;
      interestAmountSum += interestAmount
      repaymentAmountSum += repaymentAmount

      return {
        year,
        interestAmount,
        repaymentRate,
        repaymentAmount,
        remainingLoan,
        interestAmountSum,
        repaymentAmountSum,
      };
    };

    const processInterestPeriod = (): void => {
      for (let index = 0; index < interestPeriod; index++) {
        repaymentSchedule.push(calculateRepaymentForYear(remainingLoan));
        year++;
      }
      remainingLoanAfterTime = remainingLoan;
      // calculate remaining years
      while (remainingLoan > 0) {
        calculateRepaymentForYear(remainingLoan)
        year ++
      }
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
      amountPaid: repaymentSchedule.reduce(
        (acc, curr) => acc + curr.repaymentAmount,
        0,
      ),
      amountInterest: repaymentSchedule.reduce(
        (acc, curr) => acc + curr.interestAmount,
        0,
      ),
      calculatedRestDuration:
        repaymentSchedule.length > 0
          ? year - repaymentSchedule[repaymentSchedule.length - 1].year - 1
          : 2,
    };

    return { initialData: formData, repaymentSchedule, remainingInstances };
  };
}
