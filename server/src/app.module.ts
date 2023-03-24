import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { ExchangeRateModule } from './exchangerate/exchangerate.module';

@Module({
  imports: [AddressModule, ExchangeRateModule],
})
export class AppModule {}
