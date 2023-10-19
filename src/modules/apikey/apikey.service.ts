import { Global, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { PrismaService } from 'src/database/prisma.service';
import { Cache } from 'cache-manager';
import { CacheApiKey } from './entities/cache-apikey.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ListApiKeyDto } from './dto/list-apikey.dto';
import {v4 as uuidv4} from 'uuid';
import { BusinessException } from 'src/exceptions/business.exception';
import { CreateApiKeyDtoResult, CreateApikeyDto } from './dto/create-apikey.dto';
import { ApiKey } from '@prisma/client';
import { ApiKeyEntity } from './entities/apikey.entity';

@Global()
export class ApiKeyService {
    private saltOrRounds = 10;
    constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async findAll(accountOwnerExternalID: string) : Promise<ListApiKeyDto[]>{
        const apiKeys = await this.prisma.apiKey.findMany({
            where: {
                accountOwner: {
                    externalId: accountOwnerExternalID
                }
            }
        })

        let result = apiKeys.map((item)=> new ListApiKeyDto({
            identifier: item.identifier,
            expireAt: item.expireAt,
            description: item.description,
            lastUsed: item.lastUseAt
        }))

        return result
    }
    async create(apiKey : ApiKeyEntity) : Promise<CreateApiKeyDtoResult>{ 
        const apiKeyExists = await this.prisma.apiKey.findFirst({
            where: {
                identifier: apiKey.identifier
            }
        })
        if (apiKeyExists){
            throw new BusinessException("Choose other identifier :)")
        }
        const randomKey = uuidv4()
        const keyWithPrefix = this.addPrefix(randomKey, apiKey.identifier)
        const hash = await bcrypt.hash(keyWithPrefix, this.saltOrRounds);
        const currentDate = new Date()
        await this.prisma.apiKey.create({
          data: {
            key: hash,
            description: apiKey.description,
            identifier: apiKey.identifier,
            accountOwner : {
                connect: {
                    externalId: apiKey.accountOwnerExternalID
                }
            },
            lastUseAt: currentDate.toISOString(),
            expireAt: apiKey.expireAt
          },
          include: {
            accountOwner: true
          }
        })
        let result : CreateApiKeyDtoResult = {
            originalKey: keyWithPrefix,
            expireAt: apiKey.expireAt,
        }
        return result
    }

    async validateAndGetKey(originalKey : string, origin: string) : Promise<ApiKeyEntity>{
        const key = this.getApiKey(originalKey)
        const cacheApiKey = await this.cacheManager.get<CacheApiKey>(origin)
        let keyHash = cacheApiKey?.keyHash || ""
        if(!cacheApiKey){
            let apiKey = await this.prisma.apiKey.findFirst({
                where: {
                    identifier: key.identifier
                },
                include:{
                    accountOwner: true
                }
            })
            keyHash = apiKey.key
            let newKeyCache : CacheApiKey ={
                identifier: key.identifier,
                keyHash : keyHash,
                key: originalKey,
                accountOwnerExternalID: apiKey.accountOwner.externalId
            }
            await this.cacheManager.set(origin, newKeyCache , 30000)
            await this.prisma.apiKey.updateMany({
                where: {
                    identifier: key.identifier
                },
                data :{
                    lastUseAt: new Date()
                }
            })
        }
        const isMatch = await bcrypt.compare(originalKey, keyHash);
        if(!isMatch){
            await this.cacheManager.del(origin)
            throw new UnauthorizedException();
        }

        let result : ApiKeyEntity = {
            key: key.key,
            identifier: key.identifier,
            accountOwnerExternalID: key.accountOwnerExternalID
        }

        return result
    }

    async delete (externalID : string) {
        await this.prisma.apiKey.delete({
            where: {
                externalId: externalID
            }
        })
    }
    
    private addPrefix(key: string, indentifier: string): string{
        const newKey = indentifier + "_" + key
        return newKey
    }

    private getApiKey(originalKey: string) : ApiKeyEntity {
        const keySplit = originalKey.split("_")
        if(keySplit.length != 2 ){
            throw new UnauthorizedException();
        }
        const key = keySplit[1]
        const identifier = keySplit[0]
        const result : ApiKeyEntity = {
            key: key,
            identifier : identifier
        }
        return result
    }
}
