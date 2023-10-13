import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SettingsController],
  providers: [
  SettingsService, 
  PrismaService]
})
export class SettingsModule {}
