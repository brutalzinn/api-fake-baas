import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(
  @InjectQueue('transactions-queue') private transactionsQueue: Queue<Transaction>
  ){}
  async create(createTransactionDto: CreateTransactionDto) {
    await this.transactionsQueue.add(createTransactionDto)
    return 'This action adds a new transaction';
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
