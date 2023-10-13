import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ApiKeyModule } from "./modules/apikey/apikey.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    
    UsersModule,
    SettingsModule,
    TransactionModule,
    ApiKeyModule, 
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
],
})
export class AppModule {}
