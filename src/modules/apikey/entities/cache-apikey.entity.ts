import { PartialType } from "@nestjs/mapped-types"
import { ApiKeyEntity } from "./apikey.entity"

export class CacheApiKey extends PartialType(ApiKeyEntity) {
      keyHash: string
}

