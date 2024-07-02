import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { PassportModule } from '@nestjs/passport';
// import { AuthGuard } from './auth.guard';
// import { APP_GUARD } from '@nestjs/core';


@Module({
  providers: [
    AuthService,
    // for making jwt controlling global in all app routes
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers : [AuthController] , 
  imports: [
    UserModule ,
    PassportModule ,  
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ] , 

})
export class AuthModule {}
