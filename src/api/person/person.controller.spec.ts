import { CepService } from '@api/cep/cep.service';
import { mockCepService } from '@api/cep/mocks/cep.service.mock';
import { mockUserRepository } from '@api/user/mocks/user.repository.mock';
import { User } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { mockPersonRepository } from './mocks/person.repository.mock';
import { PersonController } from './person.controller';
import { Person } from './person.entity';
import { PersonService } from './person.service';

describe('PersonController', () => {
  let controller: PersonController;
  let personService: PersonService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        PersonService,
        UserService,
        {
          provide: getRepositoryToken(Person),
          useClass: mockPersonRepository,
        },
        {
          provide: CepService,
          useClass: mockCepService,
        },
        {
          provide: getRepositoryToken(User),
          useClass: mockUserRepository,
        },
      ],
    }).compile();

    controller = moduleRef.get<PersonController>(PersonController);
    personService = moduleRef.get<PersonService>(PersonService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('getPersons', () => {
    it('should return an array of persons', async () => {
      const persons = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];

      jest.spyOn(personService, 'getPersons').mockResolvedValue(persons as any);

      const result = await controller.getPersons();

      expect(result).toEqual(persons);
    });
  });

  describe('getPerson', () => {
    it('should return a person when passed a valid id', async () => {
      const person = { id: 1, name: 'Alice' };

      jest.spyOn(personService, 'getPerson').mockResolvedValue(person as any);

      const result = await controller.getPerson(person.id);

      expect(result).toEqual(person);
    });

    it('should throw a NotFoundException when passed an invalid id', async () => {
      const id = 999;

      jest
        .spyOn(personService, 'getPerson')
        .mockRejectedValue(new NotFoundException(`Person not found`));

      try {
        await controller.getPerson(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Person not found');
      }
    });
  });

  describe('createPerson', () => {
    it('should create a person with the given data', async () => {
      const personData = {
        name: 'Alice',
        fathers_name: 'Bob',
        mothers_name: 'Carol',
        birth_date: new Date('1980-01-01'),
        cep: '12345678',
      };

      const createdPerson = {
        id: 1,
        ...personData,
      };

      jest
        .spyOn(personService, 'createPerson')
        .mockResolvedValue(createdPerson as any);

      const result = await controller.createPerson(personData);

      expect(result).toEqual(createdPerson);
    });

    it('should return an error when the data is invalid', async () => {
      const personData = {
        name: 'Alice',
        birth_date: 'not a date',
      };

      jest
        .spyOn(personService, 'createPerson')
        .mockRejectedValue(new Error('Invalid data'));

      try {
        await controller.createPerson(personData as any);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid data');
      }
    });
  });

  describe('deletePerson', () => {
    it('should delete a person with the given id', async () => {
      const id = 1;

      jest.spyOn(personService, 'delete').mockResolvedValue(true);

      const result = await controller.deletePerson(id);

      expect(result).toBe(true);
    });
  });
});
