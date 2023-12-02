import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, Public, RefreshTokenGuard } from '@app/common';
import { CreateUserDto } from '@app/user/dto';
import { User } from '@app/user/schemas';
import { AuthService } from './auth.service';
import { Tokens } from './schemas';
import { LoginUserDto } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService ) {}

  @Public()
  @Mutation(() => Tokens)
  async signInLocal(
    @Args('loginUserDto') loginUserDto: LoginUserDto,
  ): Promise<Tokens> {
    return this.authService.signInLocal(loginUserDto);
  }

  @Public()
  @Mutation(() => Tokens)
  async signUpLocal(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<Tokens> {
    return this.authService.signUpLocal(createUserDto);
  }

  @Query(() => User)
  async logout(@CurrentUser('sub') userId: string): Promise<User> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Query(() => Tokens)
  async refreshTokens(
    @CurrentUser('sub') userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
