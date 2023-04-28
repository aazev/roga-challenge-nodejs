import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  mothers_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fathers_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  cep: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;
}
