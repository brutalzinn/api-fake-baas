import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { ApiKeyService } from './apikey.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { User } from 'src/decorators/user.decorator';
import { AccountOwner } from '../account-owner/entities/account-owner.entity';
import { CreateApiKey } from './entities/create-apikey.entity';

@Controller('apikey')
@ApiTags('apikey')
@UseGuards(JwtGuard)
export class ApikeyController {
  constructor(private readonly apikeyService: ApiKeyService) {}

  @Post()
  async create(@Body() createApikeyDto: CreateApikeyDto, @User() accountOwner : AccountOwner) {
    let createApiKey : CreateApiKey = createApikeyDto
    createApiKey.accountOwnerExternalID = accountOwner.id
    return await this.apikeyService.create(createApiKey);
  }

  @Get()
  async findAll(@User() accountOwner : AccountOwner) {
    const accountOwnerExternalID = accountOwner.id
    return await this.apikeyService.findAll(accountOwnerExternalID);
  }
}
