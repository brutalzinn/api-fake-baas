import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ApiKeyService } from '../apikey/apikey.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService, 
    PrismaService,
    ApiKeyService
  ],
})
export class UsersModule {}
