import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/common';
import { RoleEnum } from '@app/role/types';
import { RoleService } from '@app/role/role.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService
) {}

  private matchRoles(roles: RoleEnum[], userRole: RoleEnum) {
    return roles.some((role) => role === userRole);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx);
    const roles = this.reflector.get<RoleEnum[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.getContext().req;
    const userId = request.user.sub 
    const workspaceId = context.getArgs()['workspaceId']

    if (!userId || !workspaceId) {
      return false
    }

    const role = await this.roleService.getRole(userId, workspaceId)
    
    return this.matchRoles(roles, role.type)
  }
}
