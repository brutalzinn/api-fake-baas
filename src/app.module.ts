import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [ UsersModule, SettingsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
