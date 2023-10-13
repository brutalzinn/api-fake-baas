import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PrismaService } from "src/database/prisma.service";
import { Transaction } from "../entities/transaction.entity";
import { WalletService } from "src/modules/wallet/wallet.service";

@Processor("transactions-queue")
export class TransactionProcessConsumer{
 
constructor(private prisma: PrismaService, private wallet: WalletService){}

  @Process()
  async process(job: Job<Transaction>) {
    const transaction = job.data

    await this.wallet.validateAccount(transaction.account)
    await this.wallet.validateAccountBalance(transaction.account, transaction.value)
    let transactionExternalId = await this.createTransaction(transaction)

    await this.wallet.moveMoneyToTarget(transaction)
    await this.wallet.createWalletHistory(transaction)
    await this.updateTransactionToComplete(transaction)
  }
  
  async updateTransactionToComplete(transaction: Transaction){
     await this.prisma.transactions.update({
      where: {
        externalId: transaction.transaction
      },
      data:{
        status: 'COMPLETED'
      }
    })
  }

   async createTransaction(transaction: Transaction) : Promise<string>{
  
  const originWallet = this.prisma.userWallet.findFirst({
      where:{
        externalId: transaction.account
      }
    })

    const targetWallet = this.prisma.userWallet.findFirst({
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