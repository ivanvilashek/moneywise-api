import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { RoleEnum } from '@app/role/types';
import { User } from '@app/user/schemas';
import { Workspace } from '@app/workspace/schemas';

@ObjectType()
@Schema()
export class Role extends Document {
  @Field(() => RoleEnum)
  @Prop({ enum: RoleEnum })
  type: RoleEnum;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: Workspace.name, required: true })
  workspaceId: Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
