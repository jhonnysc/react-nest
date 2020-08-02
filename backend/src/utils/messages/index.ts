import { HttpException, HttpStatus } from "@nestjs/common";

import MessagesMapper from "./messages";

export class EmailAlreadyInUse extends HttpException {
  constructor() {
    super(
      MessagesMapper.APPLICATION_MESSAGES.OK,
      HttpStatus.OK,
    );
  }
}
