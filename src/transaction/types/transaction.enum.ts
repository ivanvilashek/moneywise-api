import { registerEnumType } from "@nestjs/graphql";

export enum TransactionEnum {
    EXPENSE,
    INCOME,
    TRANSFER,
}

registerEnumType(TransactionEnum, {
    name: 'TransactionEnum'
})