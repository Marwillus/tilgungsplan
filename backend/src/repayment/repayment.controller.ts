import { Body, Controller, Post } from '@nestjs/common';

import { RepaymentService } from './repayment.service';
import { RepaymentFormData, RepaymentResult } from './types';

@Controller('repayment')
export class RepaymentController {
  constructor(private readonly repaymentService: RepaymentService) {}

  @Post()
  calculateRepaymentPlan(
    @Body() formData: RepaymentFormData,
  ): RepaymentResult {
    return this.repaymentService.calculateRepaymentPlan(formData);
  }
}
