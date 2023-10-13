import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { ApiKeyService } from './apikey.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('apikey')
@ApiTags('apikey')
export class ApikeyController {
  constructor(private readonly apikeyService: ApiKeyService) {}

  @Post()
  async create(@Body() createApikeyDto: CreateApikeyDto) {
    return await this.apikeyService.create(createApikeyDto);
  }
}
