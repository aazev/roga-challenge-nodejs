import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  mothers_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  fathers_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @ApiProperty()
  cep: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  birth_date: Date;
}
