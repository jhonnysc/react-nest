import { Request } from 'express';

import { Token } from '@app/modules/auth/interfaces/index.';

export interface AppRequest extends Request {
  user: Token;
}
