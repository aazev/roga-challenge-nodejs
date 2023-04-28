import { ApiTokenGuard } from '@common/middleware/user_api_token/ApiTokenGuard';
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

import { CreatePersonDto } from './person.dto';
import { Person } from './person.entity';
import { PersonService } from './person.service';

@UseGuards(ApiTokenGuard)
@Controller('person')
export class PersonController {
  @Inject(PersonService)
  private readonly service: PersonService;

  @Get()
  public getPersons(): Promise<Person[]> {
    return this.service.getPersons();
  }

  @Get(':id')
  public getPerson(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.service.getPerson(id);
  }

  @Delete(':id')
  public async deletePerson(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.service.delete(id);
  }

  @Post('/new')
  public createPerson(@Body() body: CreatePersonDto): Promise<Person> {
    return this.service.createPerson(body);
  }
}
