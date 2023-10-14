import { Injectable } from '@nestjs/common';
import { EnumSettingsType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { SettingEnv } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  
  constructor(private prisma: PrismaService){}

  async findAll() {
    let settings = this.prisma.settings.findMany({
      where: {
        enviroment: 'GLOBAL'
      }
    })
    return settings
  }

  async findOneKeyByEnviroment(key: string, enviroment: SettingEnv) {
    let settings = this.prisma.settings.findFirst({
      where: {
        key: key,
        enviroment: enviroment
      }
    })
    return settings
  }
}
