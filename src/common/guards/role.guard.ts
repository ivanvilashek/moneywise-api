import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/common';
import { Role } from '@app/role/types';
import { RoleService } from '@app/role/role.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService
) {}

  private matchRoles(roles: Role[], userRole: Role) {
    return roles.some((role) => role === userRole);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userId = request.user.sub 
    const workspaceId = request.params.workspaceId

    const role = await this.roleService.getRole(userId, workspaceId)
    
    return this.matchRoles(roles, role.type)
  }
}
