import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import {
  BadRequestDTO,
  ErrorResponse,
  InternalServerErrorDTO,
} from '../constants/errors.response.dto';

export function ApiDocResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      type: BadRequestDTO,
      description: 'Invalid Body',
    }),
    ApiUnprocessableEntityResponse({
      type: ErrorResponse,
      description: 'Invalid Params',
    }),
    ApiInternalServerErrorResponse({
      type: InternalServerErrorDTO,
      description: 'Internal Error',
    }),
  );
}
