import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { CreateClientEntity } from './entities/create-client.entity';
import { Client, ClientAddress, ClientMetadata, Prisma } from '@prisma/client';
import { ClientEntity } from './entities/client.etity';
import {chain} from 'lodash';

@Injectable()
export class ClientsService {
  
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateClientEntity) {

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


  async findOneByExternalId(id: string) : Promise<ClientEntity>{
    let client = await this.prisma.client.findFirst({
      where: {externalId: id},
      include: {
        wallet: true,
        address: true,
        metadatas: true
      }
    })

    if(!client){
       throw new BusinessException("Account client doesnt found.")
    }

    //look here.  We need to do a small DTO to represent a client.
    //The problem is client is database entity at this time.
    /// but prisma has own model that we cant control how or when this will be generated.
    /// like other external libs, we dont have the control about this.
    /// soo.. to recover part of the control, we use lodash to remove some properties from prisma model.
    /// this can be less pain and with gain.
    /// but remember: uncessaries DTO can be pain with time.
    /// remember: when lodash was created, write this with vanilla javascript is like doutor strange from marvel at scene https://www.youtube.com/watch?v=21noYPJ-tr0
    
    /// for example, this a simple object transfer object
    /// you shoulnd use lodash to do at this time.. its overenginer.. 
    /// but when we need to get the metadata fields.. this will change everything.
    
    let clientEntity : ClientEntity = {
      externalId: client.externalId,
      document: client.document,
      name: client.name,
      address: {
        city: client.address.city,
        country: client.address.country,
        state: client.address.state,
        stateCode: client.address.stateCode,
        street: client.address.street,
        postalCode: client.address.postalCode
      },
      contact: {
        phoneNumber: "",
        email: ""
      }
    }

    return clientEntity
  }

  async findOneByDocument(document: string): Promise<ClientEntity>{
    /// i think you are asking at this moment why you should use many dtos for this examples.
    /// but the DTO is used to remove the dependencies of object from prisma to us project.
    /// at this time we are using prisma. but after some years.. i dont know if prisma is still alive and maintable.
    /// 
    let client = await this.prisma.client.findFirst({
      where: {
        document: document
        },
        include: {
        wallet: true,
        address: true,
        metadatas: true
      }
    })
    if(!client){
       throw new BusinessException("You cant get a user that doesnt exist.")
    }
    let clientEntity = toClient(client, client.address, client.metadatas)
    return clientEntity
    /// but you are asking why we are creating many DTOS here.
    /// you can do this with many ways. take a look at this example:
    function toClient(entity: Client, address: ClientAddress, clientMetadata: Array<ClientMetadata>) : ClientEntity {
      /// use lodash module to facilities us dto.
      ///this case we are using chain to create a copy of the object. after that we create a "keyBy" that mapp the object to a key map value and after that we get by the value of key object. Its more readable.
      let metadata = chain(clientMetadata).keyBy("key").mapValues("value").value()
      let clientEntity : ClientEntity = {
          externalId: entity.externalId,
          document: entity.document,
          name: entity.name,
          address: {
            city: address.city,
            country: address.country,
            state: address.state,
            stateCode: address.stateCode,
            street: address.street,
            postalCode: address.postalCode
          },
          contact: {
            phoneNumber: metadata.phoneNumber,
            email: metadata.email
          }
      }
        return clientEntity
    }
  }

  update(document: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${document} user`;
  }
}
