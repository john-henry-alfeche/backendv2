import { Module } from '@nestjs/common';
import { RequestLetterController } from './request-letters.controller';
import { RequestLetterService } from './request-letters.service';

@Module({
  controllers: [RequestLetterController],
  providers: [RequestLetterService],
})
export class RequestLetterModule {}
