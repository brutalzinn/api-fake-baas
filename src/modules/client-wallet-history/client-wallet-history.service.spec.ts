import { Test, TestingModule } from '@nestjs/testing';
import { ClientWalletHistoryService } from './client-wallet-history.service';

describe('ClientWalletHistoryService', () => {
  let service: ClientWalletHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientWalletHistoryService],
    }).compile();

    service = module.get<ClientWalletHistoryService>(ClientWalletHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
