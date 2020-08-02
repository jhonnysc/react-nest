import { ClassType } from "class-transformer/ClassTransformer";
import { Model, MongooseFilterQuery, MongooseUpdateQuery } from "mongoose";

import { paginate } from "@app/utils/pagination";
import { IPaginationOptions } from "@app/utils/pagination/interfaces";

import { Inject } from "@nestjs/common";

import { CreateUserDto } from "../dtos";
import { User } from "../interfaces/user.interface";

export class UserRepository {
  constructor(
    @Inject("USER_MODEL") private readonly userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  async findOne(query: MongooseFilterQuery<User>) {
    return this.userModel.findOne(query);
  }

  async deleteOne(query: MongooseFilterQuery<User>) {
    return this.userModel.deleteOne(query);
  }

  async update(
    query: MongooseFilterQuery<User>,
    user: MongooseUpdateQuery<User>,
  ) {
    return this.userModel.findOneAndUpdate(query, user, { new: true });
  }

  async paginate<T>(
    options: IPaginationOptions,
    query: MongooseFilterQuery<User>,
    dto: ClassType<T>,
  ) {
    return paginate<User, T>(this.userModel, options, query, dto);
  }
}
