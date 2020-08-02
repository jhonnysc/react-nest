import { RolesBuilder } from "nest-access-control";

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(Roles.USER)
  .updateOwn("users")
  .readOwn("users")
  .grant(Roles.ADMIN) // define new or modify existing role. also takes an array.
  .extend(Roles.USER)
  .createAny("users") // equivalent to .createOwn('video', ['*'])
  .deleteAny("users")
  .readAny("users")
  .updateAny("users");
