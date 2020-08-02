import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
