import { Module } from '@nestjs/common';
import { ClientWalletHistoryService } from './client-wallet-history.service';
import { ClientWalletHistoryController } from './client-wallet-history.controller';

@Module({
  controllers: [ClientWalletHistoryController],
  providers: [ClientWalletHistoryService],
})
export class ClientWalletHistoryModule {}
