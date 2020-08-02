import { Document } from "mongoose";

import { Timestamps } from "@app/common/interfaces/timestamp";
import { Roles } from "@app/modules/permissions/roles";

export interface User extends Document, Timestamps {
  name: string;
  email: string;
  password: string;
  sex: string;
  age: number;
  hobby: string;
  dayOfBirth: Date;
  roles: Roles[];
}
