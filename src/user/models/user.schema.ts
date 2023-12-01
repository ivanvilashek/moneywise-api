import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ select: false })
  refreshToken: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ default: new Date() })
  createdOn: Date;

  @Prop({ default: new Date() })
  modifiedOn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashed = await hash(this.password, 12);
      this.password = hashed;
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
