import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/role/types';

export const ROLES_KEY = 'roles';
export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
