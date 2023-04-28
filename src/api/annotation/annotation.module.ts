import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnnotationController } from './annotation.controller';
import { Annotation } from './annotation.entity';
import { AnnotationService } from './annotation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation])],
  controllers: [AnnotationController],
  providers: [AnnotationService],
})
export class AnnotationModule {}
