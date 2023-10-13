import { Injectable } from '@nestjs/common';
import { CreateAccountOwnerDto } from './dto/create-account-owner.dto';
import { UpdateAccountOwnerDto } from './dto/update-account-owner.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthorizeAccountOwnerDto } from './dto/authorize-account-owner.dto';

@Injectable()
export class AccountOwnerService {
  private saltOrRounds = 15;

  constructor(private prisma: PrismaService){}

  async create(createAccountOwnerDto: CreateAccountOwnerDto) {
    const password = await bcrypt.hash(createAccountOwnerDto.password, this.saltOrRounds)
    await this.prisma.accountOwner.create({
      data: {
        name: createAccountOwnerDto.name,
        email: createAccountOwnerDto.email,
        password: password
      }
    })
    return
  }

  authorize(auhtorizeAccountOwner: AuthorizeAccountOwnerDto) {
    return `This action returns all accountOwner`;
  }
}
