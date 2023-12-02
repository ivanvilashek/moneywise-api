import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/role.schema';
import { DeleteResult } from '@app/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { type, userId, workspaceId } = createRoleDto;

    const createdRole = new this.roleModel({
      type,
      userId: new Types.ObjectId(userId),
      workspaceId: new Types.ObjectId(workspaceId),
    });

    return createdRole.save();
  }

  public async getRole(userId: string, workspaceId: string): Promise<Role> {
    const role = this.roleModel.findOne({
      userId: new Types.ObjectId(userId),
      workspaceId: new Types.ObjectId(workspaceId),
    });

    if (!role) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  public async getWorkspaces(userId: string) {
    return this.roleModel
      .aggregate([
        {
          $match: { userId: new Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'workspaces',
            localField: 'workspaceId',
            foreignField: '_id',
            as: 'workspace',
          },
        },
        {
          $unwind: '$workspace',
        },
        {
          $replaceRoot: { newRoot: '$workspace' },
        },
      ])
      .exec();
  }

  public async deleteOne(filter: FilterQuery<Role>): Promise<DeleteResult> {
    return this.roleModel.deleteOne(filter).exec();
  }

  public async deleteMany(filter: FilterQuery<Role>): Promise<DeleteResult> {
    return this.roleModel.deleteMany(filter).exec();
  }
}
