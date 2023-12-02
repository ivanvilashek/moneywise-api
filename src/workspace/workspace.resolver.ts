import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser, DeleteResult, Roles } from '@app/common';
import { RoleEnum } from '@app/role/types';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto';
import { Workspace } from './schemas';

@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Mutation(() => Workspace)
  async createWorkspace(
    @CurrentUser('sub') userId: string,
    @Args('createWorkspaceDto') createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return this.workspaceService.create(createWorkspaceDto, userId);
  }

  @Roles(RoleEnum.OWNER)
  @Mutation(() => DeleteResult)
  async deleteWorkspace(
    @Args('workspaceId') workspaceId: string,
  ): Promise<DeleteResult> {
    return this.workspaceService.delete(workspaceId);
  }

  @Query(() => [Workspace])
  async getUserWorkspaces(
    @CurrentUser('sub') userId: string,
  ): Promise<Workspace[]> {
    return this.workspaceService.findByUserId(userId);
  }
}
