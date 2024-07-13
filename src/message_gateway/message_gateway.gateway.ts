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
import { CreateUserDto } from 'src/user/dto/CreateUserDto.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server; 

  constructor(
    private jwtService: JwtService , 
    private userService: UserService , 
    private messageGatewayService: MessageGatewayService , 
  ) {}

  private users: Map< number , CreateUserDto> = new Map();
  private messages: Map<number, string> = new Map();

  async getAllUsers(): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      this.users = new Map(users.map(user => [user.userId , user] )); 
    } catch (err) {
      console.error('Error getting users:', err);
    }
  }

  async getAllMessages(): Promise<void> {
    try {
      const messages = await this.messageGatewayService.getAllMessages();
      if(messages && messages.length > 0 ){
        this.messages = new Map(messages.map(message => [message.message_id, message.message_text])); 
      }
    } catch (err) {
      console.error('Error getting messages:', err);
    }
  }

  findSenderId (senderJwtToken: string ): number {
    let jwt_payload =  this.jwtService.verify(
      senderJwtToken , 
      {
        secret: jwtConstants.secret
      }
    ); 
    let senderID = jwt_payload.sub ; 
    return senderID ; 
  }

  async handleConnection(client: Socket): Promise<void> {
    try {
      await this.getAllUsers() ; 
      await this.getAllMessages(); 
    } catch (error) {
      console.log("error while getting data from db"  ,  error ); 
    }

    try {
      let senderJwtToken =  client.handshake.headers['authorization']?.split(' ')[1] as string;
      if (!senderJwtToken) {
        throw new UnauthorizedException('Token not provided');
      }
      let senderId = this.findSenderId(senderJwtToken); 
      client.join(senderId.toString());
      // const receiverId = client.handshake.query.id as string;
      // if (receiverId) {
        // this.users.set(receiverId, client);
        // // Send any stored messages to the user
        // const userMessages = this.messages.get(receiverId) || [];
        // userMessages.forEach(message => client.emit('message', message));
        // this.messages.delete(receiverId);
      // }
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

  async findAndUpdateUser(id:number , connectedUserId:number ) {
    try {
      let sender = await this.userService.getUser(id); 
      if(sender && sender.connectedUsers && sender.connectedUsers.length > 0 ){
        sender.connectedUsers.push(connectedUserId); 
      }else {
        sender.connectedUsers = [connectedUserId] ; 
      }
      this.userService.updateUser( id , sender ); 
      
    } catch (error) {
      console.log("error in updating connecting users model" , error ); 
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message : string ,
    @ConnectedSocket() client: Socket
  ): Promise<boolean> {
    try {

      let senderJwtToken =  client.handshake.headers['authorization']?.split(' ')[1] as string;
      if (!senderJwtToken) {
        throw new UnauthorizedException('Token not provided');
      }

      const senderId = this.findSenderId(senderJwtToken); 
      const receiverId = client.handshake.query.id as string ;
      let  numreceiverId:number  = +receiverId ; 

      if(receiverId) {

        await this.messageGatewayService.createMessage(
          senderId , 
          numreceiverId , 
          message
        ); 

        // update sender connected USers and
        await this.findAndUpdateUser(senderId , numreceiverId ); 
        // and also we need update receiver connectedUsers array 
        await this.findAndUpdateUser(numreceiverId , senderId ) ; 


        // and send to client have selected 
        return this.server.to(receiverId).emit("message" ,{ senderId , message} ); 

      }

      return true;

    } catch (error) {
      console.log("error while sending message, message:event"  , error ); 
    }
    
  }


}