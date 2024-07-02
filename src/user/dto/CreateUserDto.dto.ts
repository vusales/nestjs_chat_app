
import { 
    IsString, 
    IsEmail, 
    IsNotEmpty,
    IsArray, 
} from "class-validator";

export class CreateUserDto {
 
    @IsString()
    name: string ; 

    @IsString()
    lastName: string ;

    @IsEmail()
    email: string; 

    @IsString()
    phone: string; 

    
    @IsString() 
    password: string ; 

    // @IsArray()
    // connectedUsers: number[] ;

}