import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role as RoleType } from '@app/role/types/roles.enum';
import { User } from '@app/user/models/user.schema';
import { Document, Types } from 'mongoose';
import { Workspace } from '../../workspace/models/workspace.schema';

@Schema()
export class Role extends Document {
  @Prop({ type: String, enum: RoleType })
  type: RoleType;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Workspace.name })
  workspaceId: Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
