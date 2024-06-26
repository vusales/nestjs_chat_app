import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/CreateUserDto.dto';




@Injectable()
export class AuthService {

    constructor(
        private userService: UserService , 
        private jwtService: JwtService ,
    ){}


    async login ( body:LoginDto ):Promise<{ result: boolean; data: CreateUserDto | null ; message: string; token: string ;}>  {

        let user = await this.userService.findByEmail(body.email);
        if(user) {
            if(user.password === body.password ) {
                const payload = { sub: user.id, username: user.name };
                const access_token = await this.jwtService.signAsync(payload) ; 
                return {
                    result:  true , 
                    data: {
                        lastName: "" , 
                        ...user
                    } , 
                    message: "You are loged in!" , 
                    token: access_token , 
                }
            }
            return {
                result: false , 
                data: null , 
                message: "The data entered is not correct!", 
                token: "" , 
            }; 
        }
        return  {
            result:  false , 
            data: null , 
            message:  "unauthenticated!", 
            token: "",
        };  

    }


    async signIn(body:CreateUserDto ):Promise<{ result: boolean; data: CreateUserDto | null ; message: string; token: string ;}> {
      
        let user = await this.userService.findByEmail(body.email);

        if(!user){
            let newUser =  await this.userService.createUser(body) ; 
            const payload = { sub: newUser.id, username: newUser.name };
            const access_token = await this.jwtService.signAsync(payload) ;

            return {
                result:  true , 
                data: newUser , 
                message: "User registered, well done!" , 
                token: access_token , 
            }
        }


        return {
            result: false , 
            data:  null , 
            message: "This email registered before!", 
            token: "" ,
        };
    }


}
