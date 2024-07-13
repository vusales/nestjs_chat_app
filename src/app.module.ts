import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Message } from './message_gateway/entity/Message.entity';
import { UsersToMessage } from './user/entity/usersToMessage.entity';
import { AuthModule } from './auth/auth.module';
import { MessageGatewayModule } from './message_gateway/message_gateway.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456Vs',
      database: 'chatapp',
      entities: [
        User,  
        Message , 
        UsersToMessage ,
      ],
      synchronize: true,
    }),
    UserModule , 
    AuthModule, 
    MessageGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService , ],
})

export class AppModule {}
