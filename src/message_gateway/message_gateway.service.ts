import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/Message.entity';
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
            if(messages&&messages.length) {
                return messages ;   
            }
            return [] ; 
        } catch (error) {
            console.log("error in getting all messages"  , error );
        }
    }


    async createMessage(senderId:number  , receiverId: number , messageText: string ):Promise<Message> {
        try {
            let message =  this.messageRepository.create({
                sender_id : senderId , 
                receiver_id:  receiverId , 
                message_text: messageText , 
            }); 
            const result = await this.messageRepository.save(message); 
            return result ;  
        } catch (error) {
            console.log("error while creating message in DB" ,  error ); 
        }
    }
}
