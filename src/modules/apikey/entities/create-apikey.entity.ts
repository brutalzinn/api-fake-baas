export class CreateApiKey {
    identifier: string
    description: string
    name: string
    expireAt: Date
    accountOwnerExternalID?: string
}

export class CreateApiKeyResult{
    originalKey: string
    expireAt: Date
}