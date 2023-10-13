
class TargetTransaction{
    account: string
}
export class CreateWalletHistory {
   account: string
   target: TargetTransaction
   value: number
   transaction?: string
}