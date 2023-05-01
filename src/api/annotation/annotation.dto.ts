import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAnnotationDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  title;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2000)
  @ApiProperty()
  description;
}
