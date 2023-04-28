import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { AnnotationModule } from './annotation/annotation.module';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [UserModule, PersonModule, AnnotationModule, CepModule],
})
export class ApiModule {}
