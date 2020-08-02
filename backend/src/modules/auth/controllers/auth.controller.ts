import { SuccessLoggedDto } from '@app/common/constants/success.response.dto';
import { ApiDocResponses } from '@app/common/decorators/swagger.decorator';
import { Validation } from '@app/utils/pipes';

import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { UserLoginDto } from '../dtos';
import { AuthService } from '../services/auth.service';

@ApiTags('Authorization')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: SuccessLoggedDto })
  @ApiDocResponses()
  @Post('/login')
  @Validation()
  async login(@Body() user_login: UserLoginDto) {
    return this.authService.login(user_login);
  }
}
