import { CepModule } from '@api/cep/cep.module';
import { UserModule } from '@api/user/user.module';
import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonController } from './person.controller';
import { Person } from './person.entity';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), UserModule, CepModule],
  controllers: [PersonController],
  providers: [PersonService, ApiTokenGuard],
})
export class PersonModule {}
