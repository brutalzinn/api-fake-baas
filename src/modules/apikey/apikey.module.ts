import { Module } from '@nestjs/common';
import { ApikeyController } from './apikey.controller';
import { ApiKeyService } from './apikey.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from 'src/database/prisma.service';
import { ApiKeyGuard } from 'src/guards/apikey/apikey.guard';

@Module({
  controllers: [ApikeyController],
  imports: [CacheModule.register()],
  providers: [
  ApiKeyService,
  PrismaService
  ],
})
export class ApiKeyModule {}
