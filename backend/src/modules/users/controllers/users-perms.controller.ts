import { UserPaginationDto } from '@app/common/constants/success.response.dto';
import { ApiDocResponses } from '@app/common/decorators';
import { AppRequest } from '@app/common/interfaces/request';
import { PermissionGuard } from '@app/modules/permissions/decorators';
import { Validation } from '@app/utils/pipes';

import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Req,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiHeader,
} from '@nestjs/swagger';

import {
  CreateUserDto,
  UserGetDto,
  UpdateUserDto,
  UserResponseDto,
} from '../dtos';
import { UserParamDto } from '../dtos/user.param.dto';
import { UserService } from '../services';

@ApiHeader({
  name: 'authorization',
  description: 'Bearer Token',
})
@ApiTags('Developers with Permission')
@Controller('perms/developers')
export class UsersControllerPerms {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiDocResponses()
  @Post()
  @Validation()
  async create(@Body() user_dto: CreateUserDto) {
    return this.userService.create(user_dto);
  }

  @ApiOkResponse({ type: UserPaginationDto })
  @ApiDocResponses()
  @Get()
  @Validation()
  @PermissionGuard('users', 'read', 'any')
  get(@Query() query: UserGetDto) {
    return this.userService.get({ ...query, route: '/developers' });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiDocResponses()
  @Put()
  @Validation()
  @PermissionGuard('users', 'update', 'own')
  updateOwn(
    @Body() user_dto: UpdateUserDto,
    @Req() request: Partial<AppRequest>,
  ) {
    return this.userService.updateOwn(user_dto, request.user);
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiDocResponses()
  @Put('/:id')
  @Validation()
  @PermissionGuard('users', 'update', 'any')
  updateUser(@Body() user_dto: UpdateUserDto, @Param() { id }: UserParamDto) {
    return this.userService.updateAny(user_dto, id);
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiDocResponses()
  @Get('/:id')
  @Validation()
  @PermissionGuard('users', 'update', 'any')
  getAnyUser(@Param() { id }: UserParamDto) {
    return this.userService.getAnyUser(id);
  }

  @ApiNoContentResponse()
  @ApiDocResponses()
  @Delete('/:id')
  @Validation()
  @HttpCode(204)
  @PermissionGuard('users', 'update', 'any')
  deleteAnyUser(@Param() { id }: UserParamDto) {
    return this.userService.deleteAnyUser(id);
  }
}
