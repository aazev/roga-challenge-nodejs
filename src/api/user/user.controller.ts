import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './user.create.dto';
import { User } from './user.entity';
import { LoginUserDto } from './user.login.dto';
import { UserService } from './user.service';

// @UseGuards(ApiTokenGuard)
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('/new')
  public async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.service.createUser(body);
  }

  @Post('/login')
  public login(@Body() body: LoginUserDto): Promise<User> {
    return this.service.login(body.email, body.password);
  }

  @UseGuards(ApiTokenGuard)
  @Get()
  public getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @UseGuards(ApiTokenGuard)
  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @UseGuards(ApiTokenGuard)
  @Delete(':id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return await this.service.delete(id);
  }
}
