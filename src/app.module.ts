import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { SettingsModule } from './modules/settings/settings.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [ UsersModule, SettingsModule, TransactionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
