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

import { CreatePersonDto } from './person.dto';
import { Person } from './person.entity';
import { PersonService } from './person.service';

@UseGuards(ApiTokenGuard)
@Controller('person')
export class PersonController {
  @Inject(PersonService)
  private readonly service: PersonService;

  @Get()
  @ApiOperation({ summary: 'Get all persons' })
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
  public getPersons(): Promise<Person[]> {
    return this.service.getPersons();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person' })
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
  public getPerson(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.service.getPerson(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person' })
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
  public async deletePerson(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return await this.service.delete(id);
  }

  @Post('/new')
  @ApiOperation({ summary: 'Create a person' })
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
  public async createPerson(@Body() body: CreatePersonDto): Promise<Person> {
    return await this.service.createPerson(body);
  }
}
