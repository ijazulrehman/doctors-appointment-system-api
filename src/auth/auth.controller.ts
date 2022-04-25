import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decrator';
import { LoginCredentialDto } from './dto/login-credentials.dto';
import { AuthReponseEntity } from './entities/auth-response';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @ApiOkResponse({
    type: AuthReponseEntity
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Body() credentials: LoginCredentialDto
  ): Promise<any> {
    console.log(credentials)
    return req.user;
  }
}
