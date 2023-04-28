import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './user.create.dto';
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

  public async createUser(body: CreateUserDto): Promise<User> {
    if (await this.repository.findOne({ where: { email: body.email } })) {
      throw new ConflictException(`Email already exists`);
    }
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;

    return this.repository.save(user);
  }

  public async delete(id: number, soft: boolean = true): Promise<boolean> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (soft) {
      return (await this.repository.softDelete(id)).affected > 0;
    } else {
      return (await this.repository.delete(id)).affected > 0;
    }
  }

  public async findByToken(api_token: string): Promise<User> {
    return await this.repository.findOne({ where: { api_token } });
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException(`Password not matching`);
    }

    return user;
  }
}
