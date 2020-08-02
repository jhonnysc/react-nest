import { AccessControlModule } from "nest-access-control";

import { Module, Global } from "@nestjs/common";

import { RoleGuard } from "./guards";
import { roles } from "./roles";

@Global()
@Module({
  imports: [AccessControlModule.forRoles(roles)],
  providers: [RoleGuard],
  exports: [RoleGuard],
})
export class RolesModule {}
