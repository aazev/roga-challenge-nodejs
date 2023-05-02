import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const users = [
  {
    id: 1,
    name: 'Naruto Uzumaki',
    email: 'ramenlover@konohamail.com',
    password: '$2a$12$U7VRquK4keFUGnHYFBEAcO66aynFP8b3S9RFFzUGSmybdPVhXQPRW',
    api_token: 'bc998cf5-afac-44ec-bfa2-50c15557ef29',
    createdAt: new Date('2023-05-01T17:59:39.114Z'),
    updatedAt: new Date('2023-05-01T17:59:39.114Z'),
    deletedAt: null,
  } as any,
  {
    id: 2,
    name: 'Tony Stark',
    email: 'ironman@starkindustries.net',
    password: '$2a$12$U7VRquK4keFUGnHYFBEAcO66aynFP8b3S9RFFzUGSmybdPVhXQPRW',
    api_token: 'fa3a2fd1-b4d6-42b7-8f11-f3371864eca7',
    createdAt: new Date('2023-05-01T17:59:39.114Z'),
    updatedAt: new Date('2023-05-01T17:59:39.114Z'),
    deletedAt: null,
  } as any,
  {
    id: 3,
    name: 'Pikachu Pokemon',
    email: 'pika.pika@pokepost.com',
    password: '$2a$12$U7VRquK4keFUGnHYFBEAcO66aynFP8b3S9RFFzUGSmybdPVhXQPRW',
    api_token: '4987719d-26ac-45d1-8efc-e725dd4b014d',
    createdAt: new Date('2023-05-01T17:59:39.114Z'),
    updatedAt: new Date('2023-05-01T17:59:39.114Z'),
    deletedAt: null,
  } as any,
];

export class mockUserRepository {
  private users = users;

  private maxId() {
    return this.users.reduce(
      (prev, current) => (prev > current.id ? prev : current.id),
      0,
    );
  }

  public async findOne(id: number) {
    return Promise.resolve(this.users.find((u) => u.id === id));
  }

  public async find() {
    return Promise.resolve(this.users);
  }

  public async save(user: any) {
    const nUser = {
      id: this.maxId() + 1,
      api_token: uuidv4(),
      password: bcrypt.hashSync(user.password, 12),
      ...user,
    };
    this.users.push(nUser);
    delete nUser.password;
    delete nUser.api_token;
    return Promise.resolve(nUser);
  }

  public async softDelete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return Promise.resolve({ affected: 0 });
    }
    user.deletedAt = new Date();
    return Promise.resolve({ affected: 1 });
  }

  public async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return Promise.resolve({ affected: 0 });
    }
    this.users = this.users.filter((u) => u.id !== id);
    return Promise.resolve({ affected: 1 });
  }
}
