import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserLoginResponseDto {
  @ApiProperty()
  @Expose()
  access_token: string;

  @ApiProperty()
  @Expose()
  expiries_in: number;
}
