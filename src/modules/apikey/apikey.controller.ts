import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { ApiKeyService } from './apikey.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { AccountOwner } from '../account-owner/entities/account-owner.entity';
import { CreateApiKey } from './entities/create-apikey.entity';
import { CurrentUser } from 'src/decorators/current.user';

@Controller('apikey')
@ApiTags('apikey')
@UseGuards(JwtGuard)
export class ApikeyController {
  constructor(private readonly apikeyService: ApiKeyService) {}

  @Post()
  async create(@Body() createApikeyDto: CreateApikeyDto, @CurrentUser() accountOwner : AccountOwner) {
    let createApiKey : CreateApiKey = createApikeyDto
    createApiKey.accountOwnerExternalID = accountOwner.id
    return await this.apikeyService.create(createApiKey);
  }

  @Get()
  async findAll(@CurrentUser() accountOwner : AccountOwner) {
    const accountOwnerExternalID = accountOwner.id
    return await this.apikeyService.findAll(accountOwnerExternalID);
  }
}
