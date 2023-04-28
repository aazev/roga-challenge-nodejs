import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
