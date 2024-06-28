import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageGatewayService {

    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    async getAllMessages():Promise<Message[]> {
        try {
            let messages =  await  this.messageRepository.find() ; 
            return messages ;
            
        } catch (error) {
            console.log("error in getting all messages"  , error );
        }
    }
}
