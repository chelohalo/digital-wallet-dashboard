import { PrismaService } from 'src/prisma/prisma.service';
import { ExchangeRate, Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(private prisma: PrismaService) {
    this.populateExchangeRatesOnStartup().catch((err) => {
      this.logger.error(err);
    });
  }

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

  async updateETHUSDExchangeRate(): Promise<ExchangeRate> {
    const { data } = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );
    return this.prisma.exchangeRate.update({
      where: { name: 'ETHUSD' },
      data: { rate: Number(data.result.ethusd) },
    });
  }
  private async populateExchangeRatesOnStartup(): Promise<void> {
    const ratesExist = await this.prisma.exchangeRate.findMany();
    if (ratesExist.length === 0) {
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const ethusd = Number(data.result.ethusd);
      await this.prisma.exchangeRate.createMany({
        data: [
          { name: 'EURUSD', rate: 1.08 },
          { name: 'ETHUSD', rate: ethusd },
        ],
      });
      this.logger.log('Exchange rates populated on startup');
    } else {
      this.logger.log('Exchange rates already exist on startup');
    }
  }
}
