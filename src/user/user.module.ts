import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersToMessage } from './entity/usersToMessage.entity';
import { Message } from 'src/message_gateway/entity/Message.entity';

@Module({
  controllers: [UserController],
  providers: [UserService], 
  imports: [TypeOrmModule.forFeature([
    User , 
    UsersToMessage , 
    Message]
  )] ,
  exports: [UserService] ,  
})
export class UserModule {} 
