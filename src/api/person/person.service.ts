import { CepService } from '@api/cep/cep.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './person.dto';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  @InjectRepository(Person)
  private readonly repository: Repository<Person>;
  @Inject(CepService)
  private readonly cepService: CepService;

  public async getPersons(): Promise<Person[]> {
    let persons = await this.repository.find();
    for (let person of persons) {
      const cep = await this.cepService.getCep(person.cep);
      person.address = cep;
    }
    return persons;
  }

  public async getPerson(id: number): Promise<Person> {
    const person = await this.repository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person not found`);
    } else {
      const cep = await this.cepService.getCep(person.cep);
      person.address = cep;
      return person;
    }
  }

  public async createPerson(body: CreatePersonDto): Promise<Person> {
    let person: Person = new Person();

    const cep = await this.cepService.getCep(body.cep);

    person.name = body.name;
    person.mothers_name = body.mothers_name;
    person.fathers_name = body.fathers_name;
    person.cep = body.cep;
    person.birth_date = body.birth_date;

    person = await this.repository.save(person);
    person.address = cep;
    return person;
  }

  public async delete(id: number): Promise<void> {
    const person = await this.repository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person not found`);
    }

    await this.repository.delete(id);
  }
}
