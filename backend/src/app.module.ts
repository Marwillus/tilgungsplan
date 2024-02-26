import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepaymentModule } from './repayment/repayment.module';

@Module({
  imports: [RepaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
