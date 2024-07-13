import { Test, TestingModule } from '@nestjs/testing';
import { MessageGatewayController } from './message_gateway.controller';

describe('MessageGatewayController', () => {
  let controller: MessageGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageGatewayController],
    }).compile();

    controller = module.get<MessageGatewayController>(MessageGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
