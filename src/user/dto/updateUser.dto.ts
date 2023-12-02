import { CreateUserDto } from './createUser.dto';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}
