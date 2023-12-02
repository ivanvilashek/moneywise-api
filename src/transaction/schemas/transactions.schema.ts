import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { User } from '@app/user/schemas';
import { Workspace } from '@app/workspace/schemas';
import { TransactionEnum } from '@app/transaction/types';

@ObjectType()
@Schema()
export class Transaction extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Int)
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  notes: string;

  @Field()
  @Prop()
  category: string;

  @Field(() => TransactionEnum)
  @Prop({ enum: TransactionEnum })
  type: TransactionEnum;

  @Field(() => Date)
  @Prop({ default: new Date() })
  createdOn: Date;

  @Field(() => Date)
  @Prop({ default: new Date() })
  modifiedOn: Date;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: Workspace.name, required: true })
  workspaceId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
