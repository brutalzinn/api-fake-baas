import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsDate,IsNotIn, IsAlpha,IsDateString } from 'class-validator';

export class CreateApikeyDto {
    @ApiProperty()
    @IsAlpha()
    identifier: string
    @ApiProperty()
    description: string
    @ApiProperty()
    @IsDateString()
    expireAt: string
}

export class CreateApiKeyDtoResult{
    originalKey: string
    expireAt: string
}
