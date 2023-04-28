import { BadRequestException, Injectable } from '@nestjs/common';

import { Cep } from './cep.class';

@Injectable()
export class CepService {
  // Opted for an in-memory cache, since this is nothing but a code challenge.
  // For a real-world application, I would use a Redis cache. Or even a
  // mysql table.
  private cepCache = new Map<string, Cep>();

  public async getCep(cep: string): Promise<any> {
    if (this.cepCache.has(cep)) {
      return this.cepCache.get(cep);
    }

    const cepData = await this.getCepData(cep);

    if (cepData.erro) {
      throw new BadRequestException('CEP inválido');
    }

    const data = {
      cep: cepData.cep,
      logradouro: cepData.logradouro,
      complemento: cepData.complemento,
      bairro: cepData.bairro,
      localidade: cepData.localidade,
      uf: cepData.uf,
      ibge: cepData.ibge,
      gia: cepData.gia,
      ddd: cepData.ddd,
      siafi: cepData.siafi,
    };

    this.cepCache.set(cep, data);
    return data;
  }

  private async getCepData(cep: string): Promise<any> {
    const axios = require('axios');

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
  }
}
