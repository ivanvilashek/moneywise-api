import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenGuard, RoleGuard } from '@app/common';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionSchema } from './schemas';
import { RoleModule } from '@app/role/role.module';
import { TransactionResolver } from './transaction.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    RoleModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    TransactionService,
    TransactionResolver
],
})
export class TransactionModule {}
