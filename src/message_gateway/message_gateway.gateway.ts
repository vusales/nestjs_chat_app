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
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/auth/contants';

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
    private jwtService: JwtService , 
  ) {}

  private users:any;  
  private messages:any; 


  async getAllUsers():Promise<void>{
    try{
      let users = await this.userService.getUsers() ; 
      // console.log(users);
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
      if(messages.length){
        this.messages = messages ; 
      }else {
        this.messages = [] ; 
      }
    }catch(err) {
      console.log(err); 
    } 
  }


  async handleConnection(client: Socket): Promise<void> {
    try {

      await this.getAllUsers() ; 
      // await this.getAllMessages(); 

      let senderJwtToken =  client.handshake.headers.user_token as string ;
      console.log( "senderJwtToken" ,  senderJwtToken ) ; 

      if (!senderJwtToken) {
        throw new UnauthorizedException('Token not provided');
      }
      let jwt_payload =  await this.jwtService.verifyAsync(
        senderJwtToken , 
        {
          secret: jwtConstants.secret
        }
      ); 

      let senderID = jwt_payload.sub ; 

      console.log( "jwt_payload" ,  jwt_payload ) ; 

      // console.log('this.user'  , this.users ) ; 
      // console.log('client'  , client.handshake ); 
      // console.log('this.messages'  , this.messages ) ; 
      const userId = client.handshake.query.id as string;
      if (userId) {
        // this.users.set(userId, client);
        // // Send any stored messages to the user
        // const userMessages = this.messages.get(userId) || [];
        // userMessages.forEach(message => client.emit('message', message));
        // this.messages.delete(userId);
      }
      
    } catch (error) {

      console.log("error while connection" , error ); 
      client.disconnect();
      
    }

  }

  handleDisconnect(client: Socket) {
    // const userId = Array.from(this.users.entries()).find(([_, socket]) => socket === client)?.[0];
    // if (userId) {
    //   this.users.delete(userId);
    // }
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { userId: string, message: string },
    @ConnectedSocket() client: Socket
  ): boolean {
    const { userId, message } = data;
    console.log("Sending message to", userId);
    // if (this.users.has(userId)) {
    //   this.users.get(userId).emit('message', message);
    // } else {
    //   if (!this.messages.has(userId)) {
    //     this.messages.set(userId, []);
    //   }
    //   this.messages.get(userId).push(message);
    // }
    return true;
  }


}