import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role, RoleSchema } from '@app/role/models/role.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
