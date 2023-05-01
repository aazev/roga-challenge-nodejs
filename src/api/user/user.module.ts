import { ApiTokenGuard } from '@middleware/user_api_token/ApiTokenGuard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ApiTokenGuard],
  exports: [UserService],
})
export class UserModule {}
