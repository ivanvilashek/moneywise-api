import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Workspace extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: new Date() })
  createdOn: Date;

  @Prop({ default: new Date() })
  modifiedOn: Date;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
