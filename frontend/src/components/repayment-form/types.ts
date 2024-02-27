export interface RepaymentFormData {
  loanContribution: number;
  interestRate: number;
  repaymentRateInPercent: number;
  repaymentRateInCash: number;
  interestPeriod?: number;
}

export interface RepaymentSchedule {
  year: number;
  repaymentAmount: number;
  interestAmount: number;
  principalAmount: number;
  remainingLoan: number;
}

export interface RepaymentResult {
  data: RepaymentFormData;
  repaymentSchedule: RepaymentSchedule[];
}

export type RepaymentType = 'cash' | 'string'