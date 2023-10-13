import { Module } from '@nestjs/common';
import { AccountOwnerService } from './account-owner.service';
import { AccountOwnerController } from './account-owner.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AccountOwnerController],
  providers: [AccountOwnerService, PrismaService],
})
export class AccountOwnerModule {}
