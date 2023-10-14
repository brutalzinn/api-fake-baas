import { Global, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { CreateApiKey, CreateApiKeyResult } from '../../modules/apikey/entities/create-apikey.entity';
import { PrismaService } from 'src/database/prisma.service';
import { ApiKey } from './entities/apikey.entity';
import { Cache } from 'cache-manager';
import { CacheApiKey } from './entities/cache-apikey.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ListApiKeyDto } from './dto/list-apikey.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
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
    async create(createApiKey : CreateApiKey) : Promise<CreateApiKeyResult>{ 
        const apiKeyExists = await this.prisma.apiKey.findFirst({
            where: {
                identifier: createApiKey.identifier
            }
        })
        if (apiKeyExists){
            throw new Error("Choose other identifier :)")
        }
        const randomKey = uuidv4()
        const keyWithPrefix = this.addPrefix(randomKey, createApiKey.identifier)
        const hash = await bcrypt.hash(keyWithPrefix, this.saltOrRounds);
        const currentDate = new Date()
        const expireAt = moment(currentDate).add(30, 'days').toDate()
        const lastUsed = currentDate
        await this.prisma.apiKey.create({
          data: {
            key: hash,
            description: createApiKey.description,
            identifier: createApiKey.identifier,
            accountOwner : {
                connect: {
                    externalId: createApiKey.accountOwnerExternalID
                }
            },
            lastUseAt: lastUsed,
            expireAt: expireAt
          },
          include: {
            accountOwner: true
          }
        })
        let result : CreateApiKeyResult = {
            originalKey: keyWithPrefix,
            expireAt: expireAt,
        }
        return result
    }

    async validate(originalKey : string, origin: string){
        const key = this.getApiKey(originalKey)
        const cacheApiKey = await this.cacheManager.get<CacheApiKey>(origin)
        let keyHash = cacheApiKey?.keyHash || ""
        if(!cacheApiKey){
            let apiKey = await this.prisma.apiKey.findFirst({
                where: {
                    identifier: key.identifier
                }
            })
            keyHash = apiKey.key
            let newKeyCache : CacheApiKey ={
                identifier: key.identifier,
                keyHash : keyHash,
                key: originalKey
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
    }

    addPrefix(key: string, indentifier: string): string{
        const newKey = indentifier + "_" + key
        return newKey
    }
    getApiKey(originalKey: string) : ApiKey{
        const keySplit = originalKey.split("_")
        if(keySplit.length != 2 ){
            throw new UnauthorizedException();
        }
        const key = keySplit[1]
        const identifier = keySplit[0]
        const result : ApiKey = {
            key: key,
            identifier : identifier
        }
        return result
    }
}
