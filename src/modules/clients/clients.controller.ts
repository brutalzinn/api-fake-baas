import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext, Inject, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/guards/apikey/apikey.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { ClientsService } from './clients.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AccountOwner } from '../account-owner/entities/account-owner.entity';
import { CreateClientEntity } from './entities/create-client.entity';

@Controller('clients')
@ApiTags('clients')
@UseGuards(JwtGuard, ApiKeyGuard)
export class ClientsController {
  constructor(private readonly usersService: ClientsService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() accountOwner : AccountOwner) {
    /// a dumb way to do a new DTO? ITS HUMAN READABLE? i dont like this kind approach.
    /// but the service needs only accept entitities. No more random objects.
    let createUser : CreateClientEntity = {
      ...createUserDto,
      accountOwnerExternalID: accountOwner.id
    }
    createUser.accountOwnerExternalID = accountOwner.id
    return this.usersService.create(createUser);
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
