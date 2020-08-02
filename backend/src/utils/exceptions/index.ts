import { HttpException, HttpStatus } from "@nestjs/common";

import ErrorsMapper from "./errors";

export class EmailAlreadyInUse extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.EMAIL_ALREADY_IN_USE,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class Unauthorized extends HttpException {
  constructor() {
    super(
      ErrorsMapper.APPLICATION_ERRORS.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InternalServerError extends HttpException {
  constructor() {
    super(
      ErrorsMapper.APPLICATION_ERRORS.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class Forbidden extends HttpException {
  constructor() {
    super(
      ErrorsMapper.APPLICATION_ERRORS.FORBIDDEN,
      HttpStatus.FORBIDDEN,
    );
  }
}

export class XssThreat extends HttpException {
  constructor() {
    super(ErrorsMapper.APPLICATION_ERRORS.XSS_THREAT, HttpStatus.FORBIDDEN);
  }
}

export class SqlThreat extends HttpException {
  constructor() {
    super(
      ErrorsMapper.APPLICATION_ERRORS.INJECTION_THREAT,
      HttpStatus.FORBIDDEN,
    );
  }
}

export class ForbiddenEmail extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.FORBIDDEN_EMAIL,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class InvalidDocument extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.INVALID_DOCUMENT,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class InvalidPassword extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.INVALID_PASSWORD,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class InvalidCredentials extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class BadRequest extends HttpException {
  constructor(errors: string | string[]) {
    let errs: string | string[];
    if (Array.isArray(errors)) {
      errs = errors.map((err) => err.replace(/ /g, "_").toUpperCase());
    } else {
      errs = errors;
    }

    super(
      ErrorsMapper.APPLICATION_ERRORS.BAD_REQUEST(errs),
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UserNotFound extends HttpException {
  constructor() {
    super(
      ErrorsMapper.USER_ERRORS.USER_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}
