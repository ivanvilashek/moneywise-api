import { Field, InputType, Int } from '@nestjs/graphql';
import { TransactionEnum } from '@app/transaction/types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateTransactionDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  readonly description?: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  readonly notes?: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  readonly category?: string;

  @Field(() => TransactionEnum)
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(TransactionEnum)
  readonly type: TransactionEnum;
}
