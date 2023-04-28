import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { AnnotationModule } from './annotation/annotation.module';

@Module({
  imports: [UserModule, PersonModule, AnnotationModule],
})
export class ApiModule {}
