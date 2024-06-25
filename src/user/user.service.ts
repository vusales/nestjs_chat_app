import { 
    Injectable 
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    getUsers(): Promise<User[]> {

        let data:any =  [
            {
                name: "user1" , 
                email: "user1@email.com"
            } , 
            {
                name: "user2" ,
                email: "user2@email.com"
            } , 

        ] ;

        return  data ; 
    }

    getUser( userId: number ) {

        return userId ;
    }

    createUser( CreateUserDto: CreateUserDto ) {

        console.log("it is created body" , CreateUserDto ) ; 

        return {
            result: true , 
            message: "User created successfully!"
        }

    }


}
