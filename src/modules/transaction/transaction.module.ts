import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from 'src/database/prisma.service';
import { TransactionProcessConsumer } from './consumers/transaction.process.consumer';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports:[  BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port:Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({name:"transactions-queue"}),
    ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionProcessConsumer, PrismaService, WalletService],
})
export class TransactionModule {}
