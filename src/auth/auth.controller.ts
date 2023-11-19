import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { Tokens } from './types';
import { Public, RefreshTokenGuard, User } from '@app/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in with user credentials' })
  @Public()
  @Post('local/signin')
  async signinLocal(@Body() loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.authService.signinLocal(loginUserDto);
  }

  @ApiOperation({ summary: 'Create new user' })
  @Public()
  @Post('local/signup')
  async signupLocal(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signupLocal(createUserDto);
  }

  @ApiOperation({ summary: 'Logout from account' })
  @ApiBearerAuth('JWT Access Token')
  @Get('logout')
  async logout(@User('sub') userId: string) {
    this.authService.logout(userId);
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBearerAuth('JWT Refresh Token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @User('sub') userId: string,
    @User('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
