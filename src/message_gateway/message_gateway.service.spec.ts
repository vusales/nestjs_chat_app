import { Test, TestingModule } from '@nestjs/testing';
import { MessageGatewayService } from './message_gateway.service';

describe('MessageGatewayService', () => {
  let service: MessageGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageGatewayService],
    }).compile();

    service = module.get<MessageGatewayService>(MessageGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
