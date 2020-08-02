import { Roles } from '@app/modules/permissions/roles';

export interface Token {
  user_id: string;
  email: string;
  roles: Roles[];
}
