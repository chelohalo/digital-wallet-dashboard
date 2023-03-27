import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from '@prisma/client';
import axios from 'axios';
import { hexTimestampToDate } from '../utils/date';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);
  constructor(private prisma: PrismaService) {}

  async createAddress(address: string): Promise<Address> {
    try {
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const balance = parseInt(response.data.result) / 1000000000000000000;
      const timeStamp = hexTimestampToDate(data.result[0].timeStamp);
      // is timeStamp older than 1 year
      const isOld =
        new Date(timeStamp).getTime() < new Date().getTime() - 31556952000;
      return this.prisma.address.create({
        data: {
          address,
          isOld,
          balance,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async updateAddress(address: string, isFavourite: boolean): Promise<Address> {
    const updatedAddress = await this.prisma.address.update({
      where: { address },
      data: { isFavourite },
    });
    return updatedAddress;
  }
}
