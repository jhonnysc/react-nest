import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDTO {
  @ApiProperty({
    example: 'FIELD_SHOULD_NOT_EXISTS',
  })
  message: string;

  @ApiProperty({
    example: 1000,
  })
  code: number;
}

export class ErrorResponse {
  @ApiProperty({
    example: 'CLIENT_ALREADY_EXISTS',
  })
  message: string;

  @ApiProperty({
    example: 1000,
  })
  code: number;
}

export class InternalServerErrorDTO {
  @ApiProperty({
    example: 'INTERNAL_SERVER_ERROR',
  })
  message: string;

  @ApiProperty({
    example: 1000,
  })
  code: number;
}
