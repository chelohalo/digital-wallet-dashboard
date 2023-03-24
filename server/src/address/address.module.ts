import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  providers: [PrismaService, AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
