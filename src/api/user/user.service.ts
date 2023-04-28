import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    } else {
      return user;
    }
  }

  public getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;

    return this.repository.save(user);
  }

  public async delete(id: number, soft: boolean = true): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (soft) {
      await this.repository.softDelete(id);
    } else {
      await this.repository.delete(id);
    }
  }

  public async findByToken(api_token: string): Promise<User> {
    return await this.repository.findOne({ where: { api_token } });
  }
}
