import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser, Roles } from '@app/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './schemas';
import { CreateTransactionDto } from './dto';
import { RoleEnum } from '@app/role/types';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Roles(RoleEnum.OWNER, RoleEnum.EDITOR)
  @Mutation(() => Transaction)
  async createTransaction(
    @CurrentUser('sub') userId: string,
    @Args('workspaceId') workspaceId: string,
    @Args('createTransactionDto') createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.create(
      createTransactionDto,
      userId,
      workspaceId,
    );
  }
}
