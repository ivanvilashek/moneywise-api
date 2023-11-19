import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from '@app/auth/dto/loginUser.dto';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { hash, compare } from 'bcrypt';
import { UserDocument } from '../user/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signupLocal(createUserDto: CreateUserDto): Promise<Tokens> {
    const newUser = await this.userService.create(createUserDto);
    const tokens = await this.getTokens(newUser._id.toString(), newUser.email);
    await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);
    return tokens;
  }

  public async signinLocal(loginUserDto: LoginUserDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(
      loginUserDto.email,
      '+password',
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const match = await compare(loginUserDto.password, user.password);

    if (!match) {
      throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  public async logout(userId: string): Promise<UserDocument> {
    return this.userService.update(userId, { refreshToken: null });
  }

  public async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<Tokens> {
    const user = await this.userService.findOneById(userId, '+refreshToken');

    if (!user?.refreshToken) {
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
    }

    const match = await compare(refreshToken, user.refreshToken);

    if (!match) {
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 10,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserDocument> {
    const hashed = await this.hashData(refreshToken);
    return this.userService.update(userId, { refreshToken: hashed });
  }

  private async hashData(data: string): Promise<string> {
    return hash(data, 12);
  }
}
