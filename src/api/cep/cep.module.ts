import { Module } from '@nestjs/common';

import { CepService } from './cep.service';

@Module({
  providers: [CepService],
  exports: [CepService],
})
export class CepModule {}
