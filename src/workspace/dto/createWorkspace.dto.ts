import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateWorkspaceDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
