import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAccountOwnerDto } from './dto/create-account-owner.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthorizeAccountOwnerDto } from './dto/authorize-account-owner.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountOwner } from './entities/account-owner.entity';

@Injectable()
export class AccountOwnerService {
  private saltOrRounds = 15;
  
  constructor(private prisma: PrismaService, private jwtService: JwtService){}
  
  async create(createAccountOwnerDto: CreateAccountOwnerDto) {
    const password = await bcrypt.hash(createAccountOwnerDto.password, this.saltOrRounds)
    await this.prisma.accountOwner.create({
      data: {
        name: createAccountOwnerDto.name,
        email: createAccountOwnerDto.email,
        password: password
      }
    })
  }
  
  async authorize(authorizeAccountOwner: AuthorizeAccountOwnerDto) {
    let accountOwner = await this.prisma.accountOwner.findFirst({
      where: {
        email: authorizeAccountOwner.email
      }
    })
    if(!accountOwner){
      /// TODO: CREATE CUSTOM EXCEPTION BONDER FOR BUSINESS RULES AND ANY KIND OF COMMON VALIDATION
      throw new UnauthorizedException();
    }
    
    const isMatch = await bcrypt.compare(authorizeAccountOwner.password, accountOwner.password);
    
    if(!isMatch){
      throw new UnauthorizedException();
    }

    const payload : AccountOwner = { id: accountOwner.externalId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };    
  }
}
