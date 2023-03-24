import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExchangeRateController } from './exchangerate.controller';
import { ExchangeRateService } from './exchangerate.service';

@Module({
  providers: [PrismaService, ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
