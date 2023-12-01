import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { User, Roles } from '@app/common';
import { CreateWorkspaceDto } from './dto/createWorkspace.dto';
import { Workspace } from './models/workspace.schema';
import { RoleService } from '@app/role/role.service';
import { Role } from '@app/role/types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async findByUserId(@User('sub') userId: string) {
    return this.workspaceService.findByUserId(userId);
  }

  @Post()
  async create(
    @User('sub') userId: string,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return this.workspaceService.create(createWorkspaceDto, userId);
  }

  @Roles(Role.OWNER)
  @Delete(':workspaceId')
  async delete(@Param('workspaceId') workspaceId: string) {
    return this.workspaceService.delete(workspaceId);
  }
}
