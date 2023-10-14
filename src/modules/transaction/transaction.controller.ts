import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/guards/apikey/apikey.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('transaction')
@ApiTags('transactions')
@UseGuards(JwtGuard, ApiKeyGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBody({ type: CreateTransactionDto })
   async create(@Body() createTransactionDto: CreateTransactionDto)  {
    return await this.transactionService.create(createTransactionDto);
  }

  @Get(':id')
  findOne(@Param('id') externalId: string) {
    return this.transactionService.findOne(externalId);
  }
}
