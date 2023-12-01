import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { RoleModule } from './role/role.module';
import { WorkspaceController } from './workspace/workspace.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule,
    WorkspaceModule,
    RoleModule,
    TransactionModule,
  ],
  controllers: [WorkspaceController],
  providers: [TransactionService],
})
export class AppModule {}
