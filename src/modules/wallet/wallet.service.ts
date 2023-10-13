import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MoveMoneyToTarget } from './dto/move-money-to-target.dto';
import { CreateWalletHistory } from './dto/create-wallet-history.dto';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService){}

    async validateAccount(account: string){
    let originAccount = await this.prisma.userWallet.findFirst({
        where: {
            externalId: account
        }
    })
    if (!originAccount){
        throw Error("Account not found")
    }
  }

  async validateAccountBalance(account: string, value: number){
    let originWallet = await this.prisma.userWallet.findFirst({
        where: {
            externalId: account
        }
    })
    const balance = originWallet.balance.toNumber()
    if(balance < value)
    {
        throw Error("Account found is insufficient.")
    }
  }

  async moveMoneyToTarget(moveMoneyToTarget: MoveMoneyToTarget){
    let originWalletDrawBalance = this.prisma.userWallet.update({
      where:{
        externalId: moveMoneyToTarget.account
      },
      data:{
        balance: {
          decrement: moveMoneyToTarget.value
        }
      }
    })

    let targetWalletGainBalance = this.prisma.userWallet.update({
      where:{
        externalId: moveMoneyToTarget.target.account
      },
      data:{
        balance: {
          increment: moveMoneyToTarget.value,
        },
      }
    })

    await this.prisma.$transaction(
    [
        originWalletDrawBalance,
        targetWalletGainBalance
    ])
  }

  async createWalletHistory(createWalletHistory: CreateWalletHistory){
   
   const originWallet = this.prisma.userWallet.findFirst({
      where:{
        externalId: createWalletHistory.account
      }
    })

    const targetWallet = this.prisma.userWallet.findFirst({
      where:{
        externalId: createWalletHistory.target.account
      }
    })

    const walletsResult = await Promise.all([originWallet, targetWallet])
    const originBalance = walletsResult[0].balance.toNumber()
    const originBeforeValue = originBalance + createWalletHistory.value
    const originWalletHistory = this.prisma.userWalletHistory.create({
      data:{
        userWallet: {
          connect:walletsResult[0]
        },
        direction: 'OUT',
        value: createWalletHistory.value,
        balanceBefore: originBeforeValue,
        balanceAfter: originBalance
      }
    })
    const targetBalance = walletsResult[1].balance.toNumber()
    const targetBeforeValue = targetBalance - createWalletHistory.value
    const targetWalletHistory = this.prisma.userWalletHistory.create({
      data:{
        userWallet: {
          connect:walletsResult[1]
        },
        direction: 'IN',
        value: createWalletHistory.value,
        balanceBefore: targetBeforeValue,
        balanceAfter: targetBalance      
      }
    })

    await this.prisma.$transaction(
    [
        originWalletHistory,
        targetWalletHistory
    ])
  }

}