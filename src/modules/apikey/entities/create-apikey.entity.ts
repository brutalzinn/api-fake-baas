export class CreateApiKey {
    identifier: string
    description: string
    name: string
    expireAt: Date
}

export class CreateApiKeyResult{
    originalKey: string
    expireAt: Date
}