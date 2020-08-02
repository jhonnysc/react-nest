import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsEnum,
  IsDateString,
} from "class-validator";

import { Roles } from "@app/modules/permissions/roles";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
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
  password: string;

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

  @IsEnum(Roles, { each: true })
  @IsNotEmpty()
  @ApiProperty()
  roles: Roles[];
}
