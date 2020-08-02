/* eslint-disable func-names */
import { Schema } from "mongoose";

import { Roles } from "@app/modules/permissions/roles";
import mongooseTypes from "@app/utils/mongo/types";
import { encrypt, decrypt } from "@app/utils/security";

import { User } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    name: mongooseTypes.required.string,
    sex: mongooseTypes.required.string,
    age: mongooseTypes.required.number,
    hobby: mongooseTypes.required.string,
    dayOfBirth: mongooseTypes.required.date,
    email: mongooseTypes.required.string,
    roles: [mongooseTypes.required.enum([Roles.ADMIN, Roles.USER])],
    password: mongooseTypes.required.string,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

UserSchema.pre<User>("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = encrypt(this.password);
  return next();
});

UserSchema.pre("findOne", function (next) {
  const { password } = this.getQuery();
  if (password) {
    this.setQuery({ ...this.getQuery(), password: encrypt(password) });
  }

  return next();
});

UserSchema.post("findOne", function (user: User, next) {
  if (user) Object.assign(user, { password: decrypt(user.password) });
  return next();
});

UserSchema.pre("find", function (next) {
  const { password } = this.getQuery();
  if (password) {
    this.setQuery({ ...this.getQuery(), password: encrypt(password) });
  }
  return next();
});

export { UserSchema };
