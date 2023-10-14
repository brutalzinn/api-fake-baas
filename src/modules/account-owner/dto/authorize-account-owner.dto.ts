import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthorizeAccountOwnerDto {
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    password: string
}