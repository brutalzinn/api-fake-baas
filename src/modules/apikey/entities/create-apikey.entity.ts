export class CreateApiKey {
    identifier: string
    description: string
    expireAt: string
    accountOwnerExternalID?: string
}

export class CreateApiKeyResult{
    originalKey: string
    expireAt: string
}