import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { WorkspaceService } from './workspace.service';
import { AccessTokenGuard, RoleGuard } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/user/models/user.schema';
import { Workspace, WorkspaceSchema } from './models/workspace.schema';
import { Role, RoleSchema } from '@app/role/models/role.schema';
import { WorkspaceController } from './workspace.controller';
import { RoleModule } from '@app/role/role.module';

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
  ],
  controllers: [WorkspaceController],
  exports: [WorkspaceService]
})
export class WorkspaceModule {}
