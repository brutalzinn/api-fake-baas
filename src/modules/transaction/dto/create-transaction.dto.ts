import { ApiProperty } from "@nestjs/swagger"

 class TargetTransaction{
    @ApiProperty()
    account: string
}
export class CreateTransactionDto {
    @ApiProperty()
    account: string
    @ApiProperty()
    target: TargetTransaction
    @ApiProperty()
    value: number
}

