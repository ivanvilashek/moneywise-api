import { registerEnumType } from "@nestjs/graphql";

export enum RoleEnum {
  VIEWER,
  EDITOR,
  OWNER,
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum'
})