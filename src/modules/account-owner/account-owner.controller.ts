import { Controller, Post, Body} from '@nestjs/common';
import { AccountOwnerService } from './account-owner.service';
import { CreateAccountOwnerDto } from './dto/create-account-owner.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeAccountOwnerDto } from './dto/authorize-account-owner.dto';

@Controller('account-owner')
@ApiTags("account owner")
export class AccountOwnerController {
  constructor(private readonly accountOwnerService: AccountOwnerService) {}

  @Post("/register")
  async register(@Body() createAccountOwnerDto: CreateAccountOwnerDto) {
    return await this.accountOwnerService.create(createAccountOwnerDto);
  }

  @Post("/authorize")
  async auth(@Body() auhtorizeAccountOwner: AuthorizeAccountOwnerDto) {
    return await this.accountOwnerService.authorize(auhtorizeAccountOwner);
  }

}
