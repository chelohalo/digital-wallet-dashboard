import { PrismaService } from 'src/prisma/prisma.service';
import { ExchangeRate } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(private prisma: PrismaService) {}

  async getAllExchangeRates(): Promise<ExchangeRate[]> {
    return this.prisma.exchangeRate.findMany();
  }
  async getExchangeRateByName(name: string): Promise<ExchangeRate> {
    return this.prisma.exchangeRate.findUnique({
      where: { name },
    });
  }

  async createExchangeRate(name: string, rate: number): Promise<ExchangeRate> {
    return this.prisma.exchangeRate.create({
      data: { name, rate },
    });
  }

  async updateExchangeRate(name: string, rate: number): Promise<ExchangeRate> {
    if (name !== 'EURUSD' && name !== 'ETHUSD') {
      throw new Error('the name should be EURUSD or ETHUSD');
    }
    if (name == 'EURUSD') {
      return this.prisma.exchangeRate.update({
        where: { name },
        data: { rate },
      });
    }
    if (name == 'ETHUSD') {
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`,
      );
      return this.prisma.exchangeRate.update({
        where: { name },
        data: { rate: Number(data.result.ethusd) },
      });
    }
  }
}
