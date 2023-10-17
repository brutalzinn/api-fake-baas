import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientWalletHistoryService } from './client-wallet-history.service';
import { CreateClientWalletHistoryDto } from './dto/create-client-wallet-history.dto';
import { UpdateClientWalletHistoryDto } from './dto/update-client-wallet-history.dto';

@Controller('client-wallet-history')
export class ClientWalletHistoryController {
  constructor(private readonly clientWalletHistoryService: ClientWalletHistoryService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientWalletHistoryService.findWalletHistoryByExternalID(id);
  }
}
