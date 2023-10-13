import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { ApiKeyService } from './apikey.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('apikey')
@ApiTags('apikey')
@UseGuards(JwtGuard)
export class ApikeyController {
  constructor(private readonly apikeyService: ApiKeyService) {}

  @Post()
  async create(@Body() createApikeyDto: CreateApikeyDto) {
    return await this.apikeyService.create(createApikeyDto);
  }
}
