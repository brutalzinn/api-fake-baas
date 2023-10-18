import { Module } from '@nestjs/common';
import { ClientWalletHistoryService } from './client-wallet-history.service';
import { ClientWalletHistoryController } from './client-wallet-history.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ClientWalletHistoryController],
  providers: [ClientWalletHistoryService, PrismaService],
})
export class ClientWalletHistoryModule {}
