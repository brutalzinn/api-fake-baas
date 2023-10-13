export type TransactionQueue = 'ANALYZE' | 'CREATE' | 'PROCESS' | 'COMPLETED'

class TargetTransaction{
    account: string
}
export class Transaction {
   account: string
   target: TargetTransaction
   step?: TransactionQueue | 'ANALYZE'
   value: number
   transaction?: string
}

