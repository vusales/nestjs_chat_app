import { Module } from '@nestjs/common';
import { MessageGateway } from './message_gateway.gateway';
import { UserModule } from 'src/user/user.module';
import { MessageGatewayService } from './message_gateway.service';
import { Message } from './entity/Message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGatewayController } from './message_gateway.controller';


@Module({
    providers: [MessageGateway, MessageGatewayService] , 
    imports: [
        TypeOrmModule.forFeature([Message]) , 
        UserModule 
    ], controllers: [MessageGatewayController], 
})
export class MessageGatewayModule {}
