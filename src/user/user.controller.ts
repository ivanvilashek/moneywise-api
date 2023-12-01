import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@app/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserDocument } from './models/user.schema';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getCurrentUser(@User('sub') userId: string): Promise<UserDocument> {
    return this.userService.findOneById(userId);
  }
}
