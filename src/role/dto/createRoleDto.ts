import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly type: Role;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly workspaceId: string;
}
