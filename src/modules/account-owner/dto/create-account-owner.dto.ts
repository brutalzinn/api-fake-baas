import { ApiProperty } from "@nestjs/swagger"


export class CreateAccountOwnerDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    name: string 
}
