import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Max,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserGetDto {
  @IsNumber()
  @Max(1000)
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  @Transform(value => parseInt(value, 10))
  limit = 10;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  @Transform(value => parseInt(value, 10))
  page = 1;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  sort_by?: string;

  route?: string;
}
