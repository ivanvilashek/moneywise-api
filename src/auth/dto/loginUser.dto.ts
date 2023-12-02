import { InputType, PickType } from '@nestjs/graphql';
import { CreateUserDto } from '@app/user/dto';

@InputType()
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
