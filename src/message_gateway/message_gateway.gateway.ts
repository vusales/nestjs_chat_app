 

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { MessageGatewayService } from './message_gateway.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server; 


  constructor(
    private userService: UserService , 
    private messageService: MessageGatewayService , 
  ) {}

  private users:any;  
  private messages:any; 


  async getAllUsers():Promise<void>{
    try{
      let users = await this.userService.getUsers() ; 
      console.log(users);
      if(!users) {
        this.users = [] ;
      }else {
        this.users = users ; 
      }
    }catch(err) {
      console.log(err); 
    } 
  }

  async getAllMessages():Promise<void>{
    try{
      let messages = await this.messageService.getAllMessages() ; 
      if(messages){
        this.messages = messages ; 
      }else {
        this.messages = [] ; 
      }
    }catch(err) {
      console.log(err); 
    } 
  }

  async handleConnection(client: Socket): Promise<void> {
    await this.getAllUsers() ; 
    await this.getAllMessages(); 

    console.log('this.user'  , this.users ) ; 
    console.log('this.messages'  , this.messages ) ; 
    const userId = client.handshake.query.id as string;
    if (userId) {
    }
  }

  handleDisconnect(client: Socket) {
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { userId: string, message: string },
    @ConnectedSocket() client: Socket
  ): boolean {
    const { userId, message } = data;
    console.log("Sending message to", userId);
    return true;
  }


}
  




