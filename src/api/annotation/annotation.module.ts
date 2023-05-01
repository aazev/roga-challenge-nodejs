import { Person } from '@api/person/person.entity';
import { UserModule } from '@api/user/user.module';
import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnnotationController } from './annotation.controller';
import { Annotation } from './annotation.entity';
import { AnnotationService } from './annotation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Annotation]),
    UserModule,
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [AnnotationController],
  providers: [AnnotationService, ApiTokenGuard],
})
export class AnnotationModule {}
