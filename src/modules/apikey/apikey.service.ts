import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { CreateApiKey, CreateApiKeyResult } from '../../modules/apikey/entities/create-apikey.entity';
import { PrismaService } from 'src/database/prisma.service';
import { ApiKey } from './entities/get-apikey.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheApiKey } from './entities/cache-apikey.entity';

@Injectable()
export class ApiKeyService {
    private saltOrRounds = 10;
    constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async create(createApiKey : CreateApiKey) : Promise<CreateApiKeyResult>{
        
        const apiKeyExists = await this.prisma.apiKey.findFirst({
            where: {
                identifier: createApiKey.identifier
            }
        })
        if (apiKeyExists){
            throw new Error("Choose other identifier :)")  ///TODO: implement error layer
        }
        const randomKey =  Math.random().toString(36).slice(-8);
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
            lastUseAt: lastUsed,
            expireAt: expireAt
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
            await this.cacheManager.set(origin, newKeyCache , 15000)
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
