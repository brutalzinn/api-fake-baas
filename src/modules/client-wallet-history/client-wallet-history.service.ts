import { Injectable } from '@nestjs/common';
import { CreateClientWalletHistoryDto } from './dto/create-client-wallet-history.dto';
import { UpdateClientWalletHistoryDto } from './dto/update-client-wallet-history.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ClientWalletHistory } from './entities/client-wallet-history.entity';
import {map} from 'lodash';

@Injectable()
export class ClientWalletHistoryService {
  constructor(private prisma: PrismaService){}
  async findWalletHistoryByExternalID(walletExternalID: string) : Promise<Array<ClientWalletHistory>>{

   let walletHistory = await this.prisma.clientWalletHistory.findMany({
    where: {
      clientWallet: {
        externalId: walletExternalID
      }
    },
      include: {
        clientWallet: true
      }
    })

    ///its like when you do with a simple map. but with more human readable method.
    /// we need lodash? i think at this moment, no.

    let mapperArray = map(walletHistory, function(data) {
      let obj : ClientWalletHistory = {
        id: data.id,
        idClientWallet: data.idClientWallet,
        direction      : data.direction,
        balanceBefore  : data.balanceBefore.toNumber(),
        balanceAfter   : data.balanceAfter.toNumber(),
        value          : data.value.toNumber(),
        createAt       : data.createAt,
        updateAt       : data.updateAt 
      }
      return obj
    })
    return mapperArray
  }
}
