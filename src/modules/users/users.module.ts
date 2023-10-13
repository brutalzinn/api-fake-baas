import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ApiKeyGuard } from 'src/guards/apikey/apikey.guard';
import { ApiKeyModule } from '../apikey/apikey.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ApiKeyService } from '../apikey/apikey.service';

@Module({
  controllers: [UsersController],
  imports: [CacheModule.register()],
  providers: [
  UsersService, 
  PrismaService,
  ApiKeyService,
  ApiKeyGuard
  ],
})
export class UsersModule {}
