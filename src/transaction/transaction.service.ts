import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schemas';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  public async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
    workspaceId: string,
  ): Promise<Transaction> {
    const newTransaction = new this.transactionModel({
      ...createTransactionDto,
      createdBy: new Types.ObjectId(userId),
      workspaceId: new Types.ObjectId(workspaceId),
    });
    console.log(newTransaction)
    return newTransaction.save();
  }
}
