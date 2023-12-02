import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@app/role/types';

export const ROLES_KEY = 'roles';
export const Roles = (...args: RoleEnum[]) => SetMetadata(ROLES_KEY, args);
