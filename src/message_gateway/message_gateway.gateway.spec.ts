import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateway } from './message_gateway.gateway';

describe('MessageGateway', () => {
  let gateway: MessageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageGateway],
    }).compile();

    gateway = module.get<MessageGateway>(MessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
