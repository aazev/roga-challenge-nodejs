import { CepService } from '@api/cep/cep.service';
import { mockCepService } from '@api/cep/mocks/cep.service.mock';
import { mockPersonRepository } from '@api/person/mocks/person.repository.mock';
import { Person } from '@api/person/person.entity';
import { PersonService } from '@api/person/person.service';
import { mockUserRepository } from '@api/user/mocks/user.repository.mock';
import { User } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Annotation } from './annotation.entity';
import { AnnotationService } from './annotation.service';
import { mockAnnotationRepository } from './mocks/annotation.repository.mock';

describe('AnnotationService', () => {
  let annotationService: AnnotationService;
  let personService: PersonService;
  let userService: UserService;
  let annotationRepository: Repository<Annotation>;
  let personRepository: Repository<Person>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnotationService,
        PersonService,
        UserService,
        {
          provide: CepService,
          useClass: mockCepService,
        },
        {
          provide: 'AnnotationRepository',
          useClass: mockAnnotationRepository,
        },
        {
          provide: 'PersonRepository',
          useClass: mockPersonRepository,
        },
        { provide: 'UserRepository', useClass: mockUserRepository },
      ],
    }).compile();

    annotationService = module.get<AnnotationService>(AnnotationService);
    personService = module.get<PersonService>(PersonService);
    userService = module.get<UserService>(UserService);
    annotationRepository = module.get<Repository<Annotation>>(
      getRepositoryToken(Annotation),
    );
    personRepository = module.get<Repository<Person>>(
      getRepositoryToken(Person),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(annotationService).toBeDefined();
  });

  describe('getAnnotations', () => {
    it('should return an array of annotations when passed a valid person id', async () => {
      const annotations = await annotationService.getAnnotations(1);

      expect(annotations).toBeDefined();
      expect(annotations).toBeInstanceOf(Array);
      expect(annotations.length).toBe(3);
    });

    it('should throw a NotFoundException when passed an invalid person id', async () => {
      try {
        await annotationService.getAnnotations(99);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Person not found');
      }
    });
  });
});
