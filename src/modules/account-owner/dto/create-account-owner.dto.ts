import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from 'class-validator';


export class CreateAccountOwnerDto {
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    password: string
    @ApiProperty()
    @IsNotEmpty()
    name: string 
}
