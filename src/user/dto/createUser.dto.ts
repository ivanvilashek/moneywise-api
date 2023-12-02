import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
