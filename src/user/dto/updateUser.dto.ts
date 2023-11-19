import { CreateUserDto } from './createUser.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  refreshToken?: string;
}
