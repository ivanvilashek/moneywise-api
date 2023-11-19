import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { AccessTokenGuard } from '@app/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
