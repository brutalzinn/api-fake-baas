import { Test, TestingModule } from '@nestjs/testing';
import { ClientWalletHistoryController } from './client-wallet-history.controller';
import { ClientWalletHistoryService } from './client-wallet-history.service';

describe('ClientWalletHistoryController', () => {
  let controller: ClientWalletHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientWalletHistoryController],
      providers: [ClientWalletHistoryService],
    }).compile();

    controller = module.get<ClientWalletHistoryController>(ClientWalletHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
