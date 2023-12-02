import { Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from '@app/common';
import { UserService } from './user.service';
import { User } from './schemas';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getCurrentUser(@CurrentUser('sub') userId: string): Promise<User> {
    return this.userService.findOneById(userId);
  }
}
