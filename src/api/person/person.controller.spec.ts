import { UserService } from '@api/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

import { PersonController } from './person.controller';
import { PersonService } from './person.service';

const mockUserService = {};
const mockPersonService = {};

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonController,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: PersonService,
          useValue: mockPersonService,
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
