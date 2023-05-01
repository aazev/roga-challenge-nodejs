import { CepService } from '@api/cep/cep.service';
import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import { Test, TestingModule } from '@nestjs/testing';

import { PersonService } from './person.service';

const mockApiTokenGuard = { canActivate: jest.fn().mockReturnValue(true) };
const mockCepService = { getCep: jest.fn().mockReturnValue({}) };
const mockPersonRepository = {};

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: 'PersonRepository',
          useValue: mockPersonRepository,
        },
        {
          provide: ApiTokenGuard,
          useValue: mockApiTokenGuard,
        },
        {
          provide: CepService,
          useValue: mockCepService,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test cases for other methods like getPersons(), getPerson(), createPerson(), deletePerson()
});
