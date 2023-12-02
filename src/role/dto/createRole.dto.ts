import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '@app/role/types';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateRoleDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly type: RoleEnum;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly workspaceId: string;
}
