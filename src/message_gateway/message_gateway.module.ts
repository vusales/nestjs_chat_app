import { Module } from '@nestjs/common';
import { MessageGateway } from './message_gateway.gateway';
import { UserModule } from 'src/user/user.module';
import { MessageGatewayService } from './message_gateway.service';
import { Message } from './entity/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [MessageGateway, MessageGatewayService] , 
    imports: [TypeOrmModule.forFeature([Message]) , UserModule] , 
})
export class MessageGatewayModule {}
