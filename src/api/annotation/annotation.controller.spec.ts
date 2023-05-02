import { mockPersonRepository } from '@api/person/mocks/person.repository.mock';
import { Person } from '@api/person/person.entity';
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
  let personRepository: Repository<Person>;
  let userRepository: Repository<User>;
  let annotationRepository: Repository<Annotation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnotationController,
        AnnotationService,
        UserService,
        {
          provide: getRepositoryToken(Annotation),
          useValue: mockAnnotationRepository,
        },
        {
          provide: getRepositoryToken(Person),
          useValue: mockPersonRepository,
        },
        { provide: getRepositoryToken(User), useClass: mockUserRepository },
        {
          provide: getRepositoryToken(Annotation),
          useClass: mockAnnotationRepository,
        },
      ],
    }).compile();

    controller = module.get<AnnotationController>(AnnotationController);
    personRepository = module.get<Repository<Person>>(
      getRepositoryToken(Person),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    annotationRepository = module.get<Repository<Annotation>>(
      getRepositoryToken(Annotation),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all annotations from a person', async () => {
    const allAnnotations = (await annotationRepository.find()).filter(
      (annot) => annot.person.id === 1,
    );
    const findOneSpy = jest.spyOn(personRepository, 'findOne');
    const annotations = await controller.getAnnotations(1);
    console.error(annotations);
    expect(annotations).toBeDefined();
    expect(annotations.length).toBe(3);
  });
});
