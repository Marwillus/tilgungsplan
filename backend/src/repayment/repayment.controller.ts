import { Body, Controller, Post } from '@nestjs/common';

import { RepaymentService } from './repayment.service';
import { RepaymentFormData, RepaymentSchedule } from './types';

@Controller('repayment')
export class RepaymentController {
  constructor(private readonly repaymentService: RepaymentService) {}

  @Post()
  calculateRepaymentPlan(
    @Body() formData: RepaymentFormData,
  ): RepaymentSchedule[] {
    return this.repaymentService.calculateRepaymentPlan(formData);
  }
}
