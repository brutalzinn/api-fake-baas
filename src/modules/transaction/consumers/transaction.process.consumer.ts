import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PrismaService } from "src/database/prisma.service";
import { Transaction } from "../entities/transaction.entity";
import { WalletService } from "src/modules/wallet/wallet.service";
import { Constants } from "src/constants";

@Processor(Constants.TRANSACTION_QUEUE_NAME)
export class TransactionProcessConsumer{
 
constructor(private prisma: PrismaService, private wallet: WalletService){}

  @Process()
  async process(job: Job<Transaction>) {
    const transaction = job.data
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
    
}