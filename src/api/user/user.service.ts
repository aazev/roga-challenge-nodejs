import {
  BadRequestException,
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
import { UpdateUserPasswordDto } from './user.password.update.dto';
import { UpdateUserDto } from './user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    } else {
      delete user.api_token;
      return user;
    }
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException(`Users not found`);
    }

    return users.map((user) => {
      delete user.api_token;
      return user;
    });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ where: { email: body.email } })) {
      throw new ConflictException(`Email already exists`);
    }
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;

    return this.userRepository.save(user);
  }

  public async delete(id: number, soft: boolean = true): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (soft) {
      return (await this.userRepository.softDelete(id)).affected > 0;
    } else {
      return (await this.userRepository.delete(id)).affected > 0;
    }
  }

  public async findByToken(api_token: string): Promise<User> {
    return await this.userRepository.findOne({ where: { api_token } });
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository
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

  public async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    user.name = body.name;
    user.email = body.email;

    return this.userRepository.save(user);
  }

  public async updateUserPassword(
    id: number,
    body: UpdateUserPasswordDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { oldPassword, newPassword } = body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.update(id, { password: hashedPassword });

    return await this.userRepository.findOne({ where: { id } });
  }
}
