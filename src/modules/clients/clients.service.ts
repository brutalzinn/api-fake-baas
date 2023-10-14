import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClientsService {
  
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {

    const userExists = await this.prisma.client.findFirst({
      where: {document: createUserDto.document}
    })

    if (userExists){
      throw new Error("User already exists.")  ///TODO: implement error layer
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
      where: {externalId: id}
    })

    if(!user){
       throw Error("User not found")
    }

    return user
  }

   findOneByDocument(document: string){
    let user = this.prisma.client.findFirst({
      where: {document: document}
    })

    if(!user){
       throw Error("User not found")
    }

    return user
  }

  update(document: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${document} user`;
  }
}
