import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { CreateUser } from './entities/create-user.entity';

@Injectable()
export class ClientsService {
  
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUser) {

    const userExists = await this.prisma.client.findFirst({
      where: {
        account: {
          externalId: createUserDto.accountOwnerExternalID
        },
          document: createUserDto.document
        },
        include:{
          account: true
        }
    })

    if (userExists){
      throw new BusinessException("This user already exists")
    }

    await this.prisma.client.create({
      data:{
        document: createUserDto.document,
        name: createUserDto.name,
        address: {
          create:{
            state: createUserDto.address.state,
            city: createUserDto.address.city,
            postalCode: createUserDto.address.postalCode,
            country: createUserDto.address.country,
            stateCode: createUserDto.address.stateCode,
            street: createUserDto.address.street
          }
        },
        wallet: {
          create:{
            balance: 0
          }
        },
        metadatas:{
          createMany:{
            data: [
              {
                key: "contact.phone_number",
                value: createUserDto.contact.phoneNumber
              },
               {
                key: "contact.email",
                value: createUserDto.contact.email
              }
            ]
          }          
        }
      },
    include: {
      address: true,
      metadatas: true,
      wallet: true
    }
    })
  }


  findOneByExternalId(id: string){
    let user = this.prisma.client.findFirst({
      where: {externalId: id},
      include: {
        wallet: true
      }
    })

    if(!user){
       throw new BusinessException("You cant get a user that doesnt exist.")
    }

    return user
  }

   findOneByDocument(document: string){
    let user = this.prisma.client.findFirst({
      where: {document: document}
    })

    if(!user){
       throw new BusinessException("You cant get a user that doesnt exist.")
    }

    return user
  }

  update(document: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${document} user`;
  }
}
