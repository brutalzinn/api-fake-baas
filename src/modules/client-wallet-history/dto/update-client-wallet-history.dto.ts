import { PartialType } from '@nestjs/swagger';
import { CreateClientWalletHistoryDto } from './create-client-wallet-history.dto';

export class UpdateClientWalletHistoryDto extends PartialType(CreateClientWalletHistoryDto) {}
