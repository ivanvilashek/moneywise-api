import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Workspace extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Date)
  @Prop({ default: new Date() })
  createdOn: Date;

  @Field(() => Date)
  @Prop({ default: new Date() })
  modifiedOn: Date;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
