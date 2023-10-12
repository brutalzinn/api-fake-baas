import { Injectable } from '@nestjs/common';
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
}
