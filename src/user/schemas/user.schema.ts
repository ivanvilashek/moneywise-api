import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  @Prop()
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ select: false })
  refreshToken: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field()
  @Prop()
  phone: string;

  @Field(() => Date)
  @Prop({ default: new Date() })
  createdOn: Date;

  @Field(() => Date)
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
