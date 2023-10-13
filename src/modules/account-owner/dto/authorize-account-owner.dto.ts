import { ApiProperty } from "@nestjs/swagger"

export class AuthorizeAccountOwnerDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}