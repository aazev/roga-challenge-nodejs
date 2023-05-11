import { Module } from '@nestjs/common';

import { AnnotationModule } from './annotation/annotation.module';
import { CepModule } from './cep/cep.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PersonModule, AnnotationModule, CepModule],
})
export class ApiModule {}
