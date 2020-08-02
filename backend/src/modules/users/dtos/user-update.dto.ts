import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsDateString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hobby: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  dayOfBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;
}
