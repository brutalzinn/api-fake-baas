import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext, Inject, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/guards/apikey/apikey.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { ClientsService } from './clients.service';
import { REQUEST, Reflector } from '@nestjs/core';
import { User } from 'src/decorators/user.decorator';
import { AccountOwner } from '../account-owner/entities/account-owner.entity';

@Controller('clients')
@ApiTags('clients')
@UseGuards(JwtGuard, ApiKeyGuard)
export class ClientsController {
  constructor(private readonly usersService: ClientsService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto, @User() accountOwner : AccountOwner) {
    
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneByExternalId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
