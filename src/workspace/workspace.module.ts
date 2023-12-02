import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { WorkspaceService } from './workspace.service';
import { AccessTokenGuard, RoleGuard } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from '@app/role/role.module';
import { User, UserSchema } from '@app/user/schemas/user.schema';
import { Workspace, WorkspaceSchema } from './schemas/workspace.schema';
import { Role, RoleSchema } from '@app/role/schemas/role.schema';
import { WorkspaceResolver } from './workspace.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    RoleModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    WorkspaceService,
    WorkspaceResolver,
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
