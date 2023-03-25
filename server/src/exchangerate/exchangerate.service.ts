import { PrismaService } from 'src/prisma/prisma.service';
import { ExchangeRate, Prisma } from '@prisma/client';
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

  async updateETHUSDExchangeRate(): Promise<ExchangeRate> {
    const { data } = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );
    return this.prisma.exchangeRate.update({
      where: { name: 'ETHUSD' },
      data: { rate: Number(data.result.ethusd) },
    });
  }
  async populateExchangeRates(): Promise<{
    success: true;
    message: string;
    rates: { EURUSD: number; ETHUSD: number };
  }> {
    try {
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const ethusd = Number(data.result.ethusd);
      this.logger.log(`ethusd: ${ethusd}`);
      const ratesExist = await this.prisma.exchangeRate.findMany();
      this.logger.log(
        `ratesExist: ${ratesExist}\n rateExist.length: ${ratesExist.length}`,
      );
      // if si no existen las rates, las crea
      if (ratesExist.length === 0) {
        this.logger.log('entro aca');
        await this.prisma.exchangeRate.createMany({
          data: [
            { name: 'EURUSD', rate: 1.08 },
            { name: 'ETHUSD', rate: ethusd },
          ],
        });
        const rates = await this.prisma.exchangeRate.findMany();
        this.logger.log(`rates: ${rates}`);
        return {
          success: true,
          message: 'Exchange rates populated',
          rates: { EURUSD: rates[0].rate, ETHUSD: rates[1].rate },
        };
      }

      return {
        success: true,
        message: 'Exchange rates already exist',
        rates: { EURUSD: ratesExist[0].rate, ETHUSD: ratesExist[1].rate },
      };
    } catch (error) {
      this.logger.error(error);
      // throw new Error(error);
    }
  }
}
