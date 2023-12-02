import { Field, ObjectType } from "@nestjs/graphql";
import { DeleteResult as MDeleteResult } from "mongodb";

@ObjectType()
export class DeleteResult implements MDeleteResult {
    @Field()
    acknowledged: boolean;
    
    @Field()
    deletedCount: number;
}