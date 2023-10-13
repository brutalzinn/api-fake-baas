import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Transaction } from './entities/transaction.entity';
import { WalletService } from '../wallet/wallet.service';
import { PrismaService } from 'src/database/prisma.service';
import { Constants } from 'src/constants';

@Injectable()
export class TransactionService {

  constructor(
  private prisma: PrismaService,
  private wallet: WalletService,
  @InjectQueue(Constants.TRANSACTION_QUEUE_NAME) private transactionsQueue: Queue<Transaction>
  ){}
  async create(createTransactionDto: CreateTransactionDto) {
    await this.wallet.validateAccount(createTransactionDto.account)
    await this.wallet.validateAccount(createTransactionDto.target.account)
    let transaction = await this.createTransaction(createTransactionDto)
    await this.transactionsQueue.add(createTransactionDto)
    return transaction;
  }

  async findOne(externalId: string) {
    let transaction = await this.prisma.transactions.findFirst({
      where: {
        externalId: externalId
      }
    })
    return transaction
  }

  async createTransaction(transaction: Transaction) : Promise<string>{
  
  const originWallet = this.prisma.clientWallet.findFirst({
      where:{
        externalId: transaction.account
      }
    })

    const targetWallet = this.prisma.clientWallet.findFirst({
      where:{
        externalId: transaction.target.account
      }
    })

    const walletsResult = await Promise.all([originWallet, targetWallet])
    
    let result = await this.prisma.transactions.create({
      data: {
        status: 'PENDING',
        transactionType: 'P2P',
        value: transaction.value,
        senderWallet: {
          connect: walletsResult[0]
        },
        receiverWallet:{
          connect:walletsResult[1]
        },
        expireAt: new Date().toISOString()
      }
    })
    const externalId = result.externalId
    return externalId
  }
}
