import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenGuard } from '@app/common';
import { User, UserSchema } from './schemas';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    UserResolver,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
