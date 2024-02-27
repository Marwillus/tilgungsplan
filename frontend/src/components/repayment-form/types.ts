//@TODO find a way to SPOT these types
export interface RepaymentFormData {
  loanContribution: number;
  interestRate: number;
  repaymentRateInPercent: number;
  repaymentRateInCash: number;
  interestPeriodEnabled: boolean;
  interestPeriod: number;
}

export interface RepaymentSchedule {
  year: number;
  repaymentAmount: number;
  interestAmount: number;
  principalAmount: number;
  remainingLoan: number;
}

export interface RemainingInstances {
  remainingSum: number
  amountPaid: number
  amountInterest: number
  calculatedRestDuration?: number
};

export interface RepaymentResult {
  initialData: RepaymentFormData
  repaymentSchedule: RepaymentSchedule[]
  remainingInstances?: RemainingInstances
}

export type RepaymentType = 'cash' | 'string'