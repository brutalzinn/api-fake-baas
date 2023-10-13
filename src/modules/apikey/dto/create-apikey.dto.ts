import { ApiProperty } from "@nestjs/swagger"

export class CreateApikeyDto {
    @ApiProperty()
    identifier: string
    @ApiProperty()
    description: string
    @ApiProperty()
    name: string
    @ApiProperty()
    expireAt: Date
}
