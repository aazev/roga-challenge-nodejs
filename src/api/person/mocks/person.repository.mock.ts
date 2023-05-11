import { Repository } from 'typeorm';

import { Person } from '../person.entity';

export const persons = [
  {
    id: 1,
    name: 'Luffy D Monkey',
    mothers_name: 'Unknown',
    fathers_name: 'Dragon D Monkey',
    cep: '01311000',
    birth_date: new Date('1996-05-05'),
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
    annotations: [],
  },
  {
    id: 2,
    name: 'Frodo Baggins',
    mothers_name: 'Primula Brandybuck',
    fathers_name: 'Drogo Baggins',
    cep: '20031050',
    birth_date: new Date('1980-09-22'),
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
    annotations: [],
  },
  {
    id: 3,
    name: 'Totoro',
    mothers_name: 'Studio Ghibli',
    fathers_name: 'Hayao Miyazaki',
    cep: '40140130',
    birth_date: new Date('1988-04-16'),
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
    annotations: [],
  },
  {
    id: 4,
    name: 'Goku Son',
    mothers_name: 'Gine',
    fathers_name: 'Bardock',
    cep: '60060170',
    birth_date: new Date('1986-04-18'),
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
    annotations: [],
  },
  {
    id: 5,
    name: 'Harry Potter',
    mothers_name: 'Lily Potter',
    fathers_name: 'James Potter',
    cep: '60175055',
    birth_date: new Date('1980-07-31'),
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
    annotations: [],
  },
];

export class mockPersonRepository extends Repository<Person> {
  private persons = persons;

  private maxId() {
    return this.persons.reduce(
      (prev, current) => (prev > current.id ? prev : current.id),
      0,
    );
  }

  public async findOne(options: { where: { id: number } }) {
    return Promise.resolve(this.persons.find((u) => u.id === options.where.id));
  }

  public async find() {
    return Promise.resolve(this.persons);
  }

  public async save(person: any) {
    const nPerson = {
      id: this.maxId() + 1,
      ...person,
    };
    this.persons.push(nPerson);
    return Promise.resolve(nPerson);
  }

  public async delete(id: number): Promise<{ affected: number; raw }> {
    const person = await this.findOne({ where: { id } });
    if (!person) {
      return Promise.resolve({ affected: 0, raw: 0 });
    }
    this.persons = this.persons.filter((p) => p.id !== id);
    return Promise.resolve({ affected: 1, raw: 0 });
  }
}
