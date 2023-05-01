import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  oldPassword: string;
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  newPassword: string;
}
