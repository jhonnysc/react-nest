import { ACGuard } from "nest-access-control";

import {
  Injectable,
  ExecutionContext,
} from "@nestjs/common";

@Injectable()
export class RoleGuard extends ACGuard {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
