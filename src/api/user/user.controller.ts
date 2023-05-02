import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from './user.create.dto';
import { User } from './user.entity';
import { LoginUserDto } from './user.login.dto';
import { UpdateUserPasswordDto } from './user.password.update.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.update.dto';

// @UseGuards(ApiTokenGuard)
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('/new')
  @UseGuards(ApiTokenGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.service.createUser(body);
  }

  @Post('/login')
  @ApiBearerAuth('ApiTokenGuard')
  @ApiOperation({
    summary:
      "Login a user, this is used to retrieve the user's api_token required as authorization in other endpoints",
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public login(@Body() body: LoginUserDto): Promise<User> {
    return this.service.login(body.email, body.password);
  }

  @UseGuards(ApiTokenGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [User],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @UseGuards(ApiTokenGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @UseGuards(ApiTokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.service.updateUser(id, body);
  }

  @UseGuards(ApiTokenGuard)
  @Patch(':id/password')
  @ApiOperation({ summary: 'Update a user password' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserPasswordDto,
  ): Promise<User> {
    return this.service.updateUserPassword(id, body);
  }

  @UseGuards(ApiTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Boolean,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return await this.service.delete(id);
  }
}
