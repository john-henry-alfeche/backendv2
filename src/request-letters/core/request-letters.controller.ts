import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { RequestLetterService } from './request-letters.service';

@Controller('request-letters')
export class RequestLetterController {
  constructor(private readonly requestLetterService: RequestLetterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return await this.requestLetterService.findAllRequest(req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async rejectRequest(
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    return await this.requestLetterService.updateStatus(id, status);
  }
}
