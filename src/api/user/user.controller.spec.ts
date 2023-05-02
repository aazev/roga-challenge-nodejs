import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { mockUserRepository } from './mocks/user.repository.mock';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(user as any);

      const result = await controller.createUser(user);

      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return a user with api_token', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        api_token: 'api_token',
      };
      jest.spyOn(userService, 'login').mockResolvedValueOnce(user as any);

      const result = await controller.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual(user);
    });
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const users = [
        {
          id: 1,
          name: 'Test User 1',
          email: 'test1@example.com',
          password: 'password',
        },
        {
          id: 2,
          name: 'Test User 2',
          email: 'test2@example.com',
          password: 'password',
        },
      ];
      jest.spyOn(userService, 'getUsers').mockResolvedValueOnce(users as any);

      const result = await controller.getUsers();

      expect(result).toEqual(users);
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(user as any);

      const result = await controller.getUser(1);

      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const update = { name: 'Updated User' } as any;
      jest.spyOn(userService, 'updateUser').mockResolvedValueOnce(user as any);

      const result = await controller.updateUser(1, update);

      expect(result).toEqual(user);
    });
  });

  describe('updateUserPassword', () => {
    it('should update user password', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const update = {
        oldPassword: 'password',
        newPassword: 'newPassword',
      } as any;
      jest
        .spyOn(userService, 'updateUserPassword')
        .mockResolvedValueOnce(user as any);

      const result = await controller.updateUserPassword(1, update);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const update = {
        oldPassword: 'password',
        newPassword: 'newPassword',
      } as any;
      jest
        .spyOn(userService, 'updateUserPassword')
        .mockResolvedValueOnce(user as any);

      try {
        await expect(controller.updateUserPassword(999, update));
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const id = 1;
      jest.spyOn(userService, 'delete').mockResolvedValueOnce(true);

      const result = await controller.deleteUser(id);

      expect(result).toBe(true);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const id = 9999;
      jest.spyOn(userService, 'delete').mockResolvedValueOnce(false);
      try {
        await controller.deleteUser(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
