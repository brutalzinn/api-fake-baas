import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Transaction } from './entities/transaction.entity';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransactionService {

  constructor(
  private wallet: WalletService,
  @InjectQueue('transactions-queue') private transactionsQueue: Queue<Transaction>
  ){}
  async create(createTransactionDto: CreateTransactionDto) {
    let transaction = createTransactionDto
    await this.wallet.validateAccount(transaction.account)
    await this.transactionsQueue.add(transaction)
    return 'Created';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
