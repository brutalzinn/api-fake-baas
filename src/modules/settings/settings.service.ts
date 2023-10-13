import { Injectable } from '@nestjs/common';
import { EnumSettingsType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';


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

  async findOneByKeyAndEnv(key: string, system: string) {
    let settings = this.prisma.settings.findFirst({
      where: {
        key: key,
        enviroment: system as EnumSettingsType
      }
    })
    return settings
  }
}
