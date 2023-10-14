import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from 'src/database/prisma.service';
import { TransactionProcessConsumer } from './consumers/transaction.process.consumer';
import { WalletService } from '../wallet/wallet.service';
import { Constants } from 'src/constants';
import { ApiKeyService } from '../apikey/apikey.service';
@Module({
  imports:[ 
    BullModule.forRoot({
      redis: {
        host: Constants.REDIS_HOST,
        port: Constants.REDIS_PORT,
      },
    }),
    BullModule.registerQueue({name:Constants.TRANSACTION_QUEUE_NAME}),
    ],
  controllers: [TransactionController],
  providers: [
    ApiKeyService,
    TransactionService,
    TransactionProcessConsumer,
    WalletService,
    PrismaService
   ]
})
export class TransactionModule {}
