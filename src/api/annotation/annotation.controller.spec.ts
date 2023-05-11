import { CepService } from '@api/cep/cep.service';
import { mockCepService } from '@api/cep/mocks/cep.service.mock';
import { mockPersonRepository } from '@api/person/mocks/person.repository.mock';
import { Person } from '@api/person/person.entity';
import { PersonService } from '@api/person/person.service';
import { mockUserRepository } from '@api/user/mocks/user.repository.mock';
import { User } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnnotationController } from './annotation.controller';
import { Annotation } from './annotation.entity';
import { AnnotationService } from './annotation.service';
import { mockAnnotationRepository } from './mocks/annotation.repository.mock';

describe('AnnotationController', () => {
  let controller: AnnotationController;
  let personService: PersonService;
  let personRepository: Repository<Person>;
  let userRepository: Repository<User>;
  let annotationRepository: Repository<Annotation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnotationController,
        AnnotationService,
        {
          provide: CepService,
          useClass: mockCepService,
        },
        {
          provide: getRepositoryToken(Annotation),
          useClass: mockAnnotationRepository,
        },
        {
          provide: getRepositoryToken(Person),
          useClass: mockPersonRepository,
        },
        { provide: getRepositoryToken(User), useClass: mockUserRepository },
        PersonService,
        UserService,
      ],
    }).compile();

    controller = module.get<AnnotationController>(AnnotationController);
    personRepository = module.get<Repository<Person>>(
      getRepositoryToken(Person),
    );
    personService = module.get<PersonService>(PersonService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    annotationRepository = module.get<Repository<Annotation>>(
      getRepositoryToken(Annotation),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all annotations from a person', async () => {
    const annotations = await controller.getAnnotations(1);
    console.error(annotations);
    expect(annotations).toBeDefined();
    expect(annotations.length).toBe(4);
  });
});
