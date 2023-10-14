import { ApiProperty } from "@nestjs/swagger"

export class ListApiKeyDto {
    @ApiProperty()
    identifier: string
    @ApiProperty()
    description: string
    @ApiProperty()
    expireAt: Date
    @ApiProperty()
    lastUsed: Date
    constructor(params : {
      identifier: string,
      description: string,
      expireAt: Date,
      lastUsed: Date
      }){
        this.identifier = params.identifier
        this.description = params.description
        this.expireAt = params.expireAt
        this.lastUsed = params.lastUsed
    }
}