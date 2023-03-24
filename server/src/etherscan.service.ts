import { Injectable } from '@nestjs/common';
import { EtherscanApi } from 'etherscan-api';
import axios from 'axios';

@Injectable()
export class EtherscanService {
  private readonly apiKey = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';
  private readonly etherscan = new EtherscanApi(this.apiKey);

  async getTransactions(address: string) {
    const url = this.etherscan.buildUrl('account', 'txlist', {
      address,
      startblock: 0,
      endblock: 'latest',
      sort: 'asc',
    });

    const response = await axios.get(url);
    return response.data.result;
  }
}
