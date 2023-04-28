import { ApiTokenGuard } from '@common/middleware/user_api_token/ApiTokenGuard';
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

import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

// @UseGuards(ApiTokenGuard)
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

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
  ): Promise<void> {
    return await this.service.delete(id);
  }

  @Post('/new')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
