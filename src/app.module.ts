import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ApiKeyModule } from "./modules/apikey/apikey.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { UsersModule } from "./modules/clients/clients.module";
import { AccountOwnerModule } from "./modules/account-owner/account-owner.module";
import { CacheModule } from "@nestjs/cache-manager";
import { ClientWalletHistoryModule } from './modules/client-wallet-history/client-wallet-history.module';

@Module({
  imports: [
    AccountOwnerModule,
    UsersModule,
    SettingsModule,
    TransactionModule,
    ApiKeyModule, 
    CacheModule.register({
        isGlobal: true
    }),
    /// limit requests
    ThrottlerModule.forRoot([
    {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 20
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100
        }
    ]),
    ClientWalletHistoryModule,
],
})
export class AppModule {}
