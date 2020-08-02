import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export class UserParamDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  id: Types.ObjectId;
}
