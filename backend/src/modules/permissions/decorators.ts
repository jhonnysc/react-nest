import { ACGuard, UseRoles, Role } from "nest-access-control";

import { JwtAuthGuard } from "@app/modules/auth/guards";

import {
  applyDecorators,
  UseGuards,
} from "@nestjs/common";

/**
 * 
 * @param resource - Resource name 
 * @param action - Type of action
 * @param possession - Type of posession
 */
export function PermissionGuard(
  resource: Role["resource"],
  action: Role["action"],
  possession: Role["possession"],
) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard),
    UseRoles({ resource, action, possession }),
  );
}
