import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountOwnerService } from './account-owner.service';
import { CreateAccountOwnerDto } from './dto/create-account-owner.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeAccountOwnerDto } from './dto/authorize-account-owner.dto';

@Controller('account-owner')
@ApiTags("account owner")
export class AccountOwnerController {
  constructor(private readonly accountOwnerService: AccountOwnerService) {}

  @Post("/register")
  register(@Body() createAccountOwnerDto: CreateAccountOwnerDto) {
    return this.accountOwnerService.create(createAccountOwnerDto);
  }

  @Post("/authorize")
  auth(@Body() auhtorizeAccountOwner: AuthorizeAccountOwnerDto) {
    return this.accountOwnerService.authorize(auhtorizeAccountOwner);
  }

}
