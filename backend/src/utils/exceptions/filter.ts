/* eslint-disable no-param-reassign */
import {
  Forbidden,
  InternalServerError,
  BadRequest,
} from "@app/utils/exceptions";

import {
  Catch,
  ArgumentsHost,
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof ForbiddenException) {
      exception = new Forbidden();
    } else if (exception instanceof InternalServerErrorException) {
      exception = new InternalServerError();
    } else if (exception instanceof BadRequestException) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      exception = new BadRequest(exception.getResponse().message);
    }
    super.catch(exception, host);
  }
}
