import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './models/workspace.schema';
import { Model, Types } from 'mongoose';
import { CreateWorkspaceDto } from './dto/createWorkspace.dto';
import { RoleService } from '@app/role/role.service';
import { Role } from '@app/role/types';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,
    private readonly roleService: RoleService,
  ) {}

  public async create(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ): Promise<Workspace> {
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);

    await this.roleService.create({
      type: Role.OWNER,
      userId,
      workspaceId: createdWorkspace._id.toString(),
    });

    return createdWorkspace.save();
  }

  public async delete(workspaceId: string) {
    const deletedWorkspace = await this.workspaceModel
      .deleteOne({ _id: workspaceId })
      .exec();

    await this.roleService.deleteMany({
      workspaceId: new Types.ObjectId(workspaceId),
    });

    return deletedWorkspace;
  }

  public async findByUserId(userId: string) {
    return this.roleService.getWorkspaces(userId);
  }
}
