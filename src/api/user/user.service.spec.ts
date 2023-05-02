import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { mockUserRepository, users } from './mocks/user.repository.mock';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let originalCreateQueryBuilder;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: mockUserRepository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    originalCreateQueryBuilder = userRepository.createQueryBuilder;
    userRepository.createQueryBuilder = jest.fn(
      () =>
        ({
          addSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue(users[0]),
        } as any),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    userRepository.createQueryBuilder = originalCreateQueryBuilder;
  });

  describe('Login', () => {
    it('should login and return a user with api_token', async () => {
      const user = await userService.login(
        'ramenlover@konohamail.com',
        '123456',
      );

      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.name).toBe('Naruto Uzumaki');
      expect(user.email).toBe('ramenlover@konohamail.com');
      expect(user.password).toBeDefined();
      expect(user.api_token).toBeDefined();

      userRepository.createQueryBuilder = originalCreateQueryBuilder;
    });

    it('should return a NotFoundException', async () => {
      userRepository.createQueryBuilder = jest.fn(
        () =>
          ({
            addSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(null),
          } as any),
      );

      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(users[0]);

      try {
        const user = await userService.login(
          'ramenlover@konohamail.com',
          '1234561',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('getUser', () => {
    it('should return a NotFoundException when user with id does not exist', async () => {
      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      try {
        const user = await userService.getUser(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return user when user with id exists', async () => {
      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockImplementationOnce(() => {
          const found = users[0];
          delete found.password;
          delete found.api_token;
          return Promise.resolve(found);
        });

      const user = await userService.getUser(1);

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.name).toBe('Naruto Uzumaki');
      expect(user.email).toBe('ramenlover@konohamail.com');
      expect(user.password).toBeUndefined();
      expect(user.api_token).toBeUndefined();
    });

    it('Should return the list of all users', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockImplementationOnce(() => {
          const found = users;
          found.forEach((u) => {
            delete u.password;
            delete u.api_token;
          });
          return Promise.resolve(found);
        });
      const foundUsers = await userService.getUsers();

      expect(foundUsers).toBeDefined();
      expect(foundUsers.length).toBe(3);
      expect(foundUsers[0].id).toBe(1);
      expect(foundUsers[0].name).toBe('Naruto Uzumaki');
      expect(foundUsers[0].email).toBe('ramenlover@konohamail.com');
      expect(foundUsers[0].password).toBeUndefined();
      expect(foundUsers[0].api_token).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce((user: User) => {
          const maxId = users.reduce((prev, current) => {
            return prev.id > current.id ? prev.id : current.id;
          }, 0);
          const nUser = {
            id: maxId + 1,
            api_token: uuidv4(),
            ...user,
          };
          users.push(nUser);
          delete nUser.password;
          delete nUser.api_token;
          return Promise.resolve(nUser as any);
        });

      const user = await userService.createUser({
        name: 'Sasuke Uchiha',
        email: 'betterthannaruto@konohamail.com',
        password: '123456',
      });

      expect(user).toBeDefined();
      expect(user.id).toBe(4);
      expect(user.name).toBe('Sasuke Uchiha');
      expect(user.email).toBe('betterthannaruto@konohamail.com');
      expect(user.password).toBeUndefined();
      expect(user.api_token).toBeUndefined();
    });
  });
});
