import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateAnnotationDto } from './annotation.dto';
import { Annotation } from './annotation.entity';
import { AnnotationService } from './annotation.service';

@UseGuards(ApiTokenGuard)
@Controller('person/:person_id/annotation')
export class AnnotationController {
  @Inject(AnnotationService)
  private readonly service: AnnotationService;

  @Get()
  @ApiOperation({ summary: 'Get all annotations from a person' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public getAnnotations(
    @Param('person_id', ParseIntPipe) person_id: number,
  ): Promise<Annotation[]> {
    return this.service.getAnnotations(person_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an annotation from a person' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public getAnnotation(
    @Param('person_id', ParseIntPipe) person_id: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Annotation> {
    return this.service.getAnnotation(id, person_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an annotation from a person' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public async deleteAnnotation(
    @Param('person_id', ParseIntPipe) person_id: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return await this.service.delete(id, person_id);
  }

  @Post('/new')
  @ApiOperation({ summary: 'Create an annotation for a person' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public async createAnnotation(
    @Param('person_id', ParseIntPipe) person_id: number,
    @Body() body: CreateAnnotationDto,
  ): Promise<Annotation> {
    return await this.service.createAnnotation(body, person_id);
  }
}
