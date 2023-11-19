import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@app/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '@app/user/models/user.schema';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { AccessTokenGuard } from '@app/common';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
