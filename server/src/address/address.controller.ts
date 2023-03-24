import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from '@prisma/client';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  async getAllAddresses(): Promise<Address[]> {
    return this.addressService.getAllAddresses();
  }

  //create address and set isFavourite to false
  @Post()
  async createAddress(@Body() body: { address: string }): Promise<Address> {
    const { address } = body;
    return this.addressService.createAddress(address);
  }

  //update address isFavourite to param recived
  @Put()
  async updateAddress(
    @Body() body: { address: string; isFavourite: boolean },
  ): Promise<Address> {
    const { address, isFavourite } = body;
    return this.addressService.updateAddress(address, isFavourite);
  }
}
