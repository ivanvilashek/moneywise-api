import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { PickType } from '@nestjs/swagger';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
