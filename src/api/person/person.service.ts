import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './person.dto';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  @InjectRepository(Person)
  private readonly repository: Repository<Person>;

  public getPersons(): Promise<Person[]> {
    return this.repository.find();
  }

  public async getPerson(id: number): Promise<Person> {
    const person = await this.repository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person not found`);
    } else {
      return person;
    }
  }

  public createPerson(body: CreatePersonDto): Promise<Person> {
    const person: Person = new Person();

    person.name = body.name;
    person.mothers_name = body.mothers_name;
    person.fathers_name = body.fathers_name;
    person.cep = body.cep;
    person.birth_date = body.birth_date;

    return this.repository.save(person);
  }

  public async delete(id: number): Promise<void> {
    const person = await this.repository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person not found`);
    }

    await this.repository.delete(id);
  }
}
