import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { ExchangeRateService } from './exchangerate.service';
import { ExchangeRate } from '@prisma/client';

@Controller('exchangerate')
export class ExchangeRateController {
  constructor(private exchangeRateService: ExchangeRateService) {}

  @Get(':name')
  async getExchangeRateByName(
    @Param('name') name: string,
  ): Promise<ExchangeRate> {
    return this.exchangeRateService.getExchangeRateByName(name);
  }

  @Get()
  async getAllExchangeRates(): Promise<ExchangeRate[]> {
    return this.exchangeRateService.getAllExchangeRates();
  }

  //create ExchangeRate and set isFavourite to false
  @Post()
  async createExchangeRate(
    @Body() body: { name: string; rate: number },
  ): Promise<ExchangeRate> {
    const { name, rate } = body;
    return this.exchangeRateService.createExchangeRate(name, rate);
  }

  @Post('populate')
  async populateExchangeRates(): Promise<{
    success: boolean;
    message: string;
    rates: { EURUSD: number; ETHUSD: number };
  }> {
    const exchangeRates =
      await this.exchangeRateService.populateExchangeRates();
    if (exchangeRates) {
      return exchangeRates;
    }
  }

  //update ExchangeRate rate by passing name and rate
  @Put()
  async updateExchangeRate(): Promise<ExchangeRate> {
    return this.exchangeRateService.updateETHUSDExchangeRate();
  }
}
