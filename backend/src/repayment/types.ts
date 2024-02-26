export interface RepaymentFormData {
    loanContribution: number;
    interestRate: number;
    repaymentType: 'fixed' | 'percentage';
    repaymentRate: number;
    interestPeriod?: number;
  }
  
  export interface RepaymentSchedule {
    year: number;
    repaymentAmount: number;
    interestAmount: number;
    principalAmount: number;
    remainingLoan: number;
  }