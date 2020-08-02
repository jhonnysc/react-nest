import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserResponseDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  roles: string[];

  @ApiProperty()
  @Expose()
  hobby: string;

  @ApiProperty()
  @Expose()
  dayOfBirth: string;

  @ApiProperty()
  @Expose()
  age: number;

  @ApiProperty()
  @Expose()
  sex: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
