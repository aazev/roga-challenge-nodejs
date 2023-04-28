import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CepService {
  //TODO: Implementar cache
  public async getCep(cep: string): Promise<any> {
    const cepData = await this.getCepData(cep);

    if (cepData.erro) {
      throw new BadRequestException('CEP inválido');
    }

    return {
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
  }

  private async getCepData(cep: string): Promise<any> {
    const axios = require('axios');

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
  }
}
