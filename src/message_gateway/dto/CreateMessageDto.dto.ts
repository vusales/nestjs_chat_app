import { IsNumber, IsString } from "class-validator";



export class CreateMessageDto {
  
    @IsNumber()
    sender_id: number ; 


    @IsNumber()
    receiver_id: number ; 


    @IsString()
    message_text: string ; 
    
}