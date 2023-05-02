import { CepService } from '@api/cep/cep.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { mockPersonRepository } from './mocks/person.repository.mock';
import { CreatePersonDto } from './person.dto';
import { Person } from './person.entity';
import { PersonService } from './person.service';

const mockCepService = { getCep: jest.fn().mockReturnValue({}) };

describe('PersonService', () => {
  let personService: PersonService;
  let personRepository: Repository<Person>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useClass: mockPersonRepository,
        },
        {
          provide: CepService,
          useValue: mockCepService,
        },
      ],
    }).compile();

    personService = moduleRef.get<PersonService>(PersonService);
    personRepository = moduleRef.get<Repository<Person>>(
      getRepositoryToken(Person),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPersons', () => {
    it('should return an array of persons', async () => {
      const persons = await personService.getPersons();

      expect(persons).toBeDefined();
      expect(persons).toBeInstanceOf(Array);
      expect(persons.length).toBe(5);
    });
  });

  describe('getPerson', () => {
    it('should return a person when passed a valid id', async () => {
      const personObj = (await personService.getPersons()).filter(
        (person) => person.id === 1,
      )[0];
      const findOneSpy = jest
        .spyOn(personRepository, 'findOne')
        .mockResolvedValueOnce(personObj);
      const person = await personService.getPerson(1);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['annotations'],
      });
      expect(person).toBeDefined();
      expect(person.id).toBe(1);
      expect(person.name).toBe('Luffy D Monkey');
    });

    it('should throw a NotFoundException when passed an invalid id', async () => {
      try {
        await personService.getPerson(99);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Person not found');
      }
    });
  });

  describe('createPerson', () => {
    it('should create and return a new person', async () => {
      const createPersonDto: CreatePersonDto = {
        name: 'Jane Doe',
        mothers_name: 'Mary Smith',
        fathers_name: 'John Smith',
        cep: '12345678',
        birth_date: new Date('1990-01-01'),
      };

      const person = await personService.createPerson(createPersonDto);

      expect(person).toBeDefined();
      expect(person.id).toBe(6);
      expect(person.name).toBe('Jane Doe');
      expect(person.mothers_name).toBe('Mary Smith');
      expect(person.fathers_name).toBe('John Smith');
      expect(person.cep).toBe('12345678');
      expect(person.birth_date).toEqual(new Date('1990-01-01'));
    });
  });

  describe('delete', () => {
    it('should delete a person when passed a valid id', async () => {
      const deleteSpy = jest
        .spyOn(personRepository, 'delete')
        .mockResolvedValueOnce({ affected: 1 } as any);
      const personObj = (await personService.getPersons()).filter(
        (person) => person.id === 1,
      )[0];
      const findOneSpy = jest
        .spyOn(personRepository, 'findOne')
        .mockResolvedValueOnce(personObj);

      const deleted = await personService.delete(1);

      expect(deleted).toBeDefined();
      expect(deleted).toBe(true);
    });

    it('should throw a NotFoundException when passed an invalid id', async () => {
      try {
        await personService.delete(99);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Person not found');
      }
    });
  });
});
