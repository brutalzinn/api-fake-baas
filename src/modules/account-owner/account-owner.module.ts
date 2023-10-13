import { Module } from '@nestjs/common';
import { AccountOwnerService } from './account-owner.service';
import { AccountOwnerController } from './account-owner.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Constants } from 'src/constants';

@Module({
  controllers: [AccountOwnerController],
  imports: [
      JwtModule.register({
      global: true,
      secret: Constants.JWT_SECRET,
      signOptions: Constants.JWT_EXPIRE_TIME,
    })
  ],
  providers: [
    AccountOwnerService,
    PrismaService
    ],
  })
  export class AccountOwnerModule {}
  