import { Module } from '@nestjs/common';
import { ApikeyController } from './apikey.controller';
import { ApiKeyService } from './apikey.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ApikeyController],
  providers: [
    PrismaService,
    ApiKeyService
  ],
})
export class ApiKeyModule {}
