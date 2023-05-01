import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsEmail()
  @ApiProperty()
  public email: string;
}
