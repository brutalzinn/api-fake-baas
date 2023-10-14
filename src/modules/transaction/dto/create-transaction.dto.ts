import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

 class TargetTransaction{
    @ApiProperty()
    @IsNotEmpty()
    account: string
}
export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    account: string
    @ApiProperty()
    @IsNotEmpty()
    target: TargetTransaction
    @ApiProperty()
    @IsPositive()
    value: number
}

