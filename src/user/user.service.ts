import { 
    Injectable 
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UsersToMessage } from './entity/usersToMessage.entity';
import { Message } from 'src/message_gateway/entity/Message.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        
        @InjectRepository(UsersToMessage)  
        private usersToMessageRepository: Repository<UsersToMessage>,
        
        @InjectRepository(Message)  
        private messageRepository: Repository<Message>,
    ) {}

    async getUsers(): Promise<User[]> {
        let data = await this.usersRepository.find() ; 
        return  data ; 
    }

    async getUser( user_id: number ):  Promise< User|null > {
        let data = await this.usersRepository.findOneBy({ user_id }) ; 
        return data ;
    }

    async createUser( CreateUserDto: CreateUserDto ): Promise<User>{
        const user = this.usersRepository.create(CreateUserDto);
        const result = await this.usersRepository.save(user); 
        return result ;
    }

    async updateUser(user_id: number , CreateUserDto: CreateUserDto   ): Promise<User> {
        const user = await this.usersRepository.findOneBy({user_id});
        if (!user) {
            throw new Error(`User with user_id ${user_id} not found`);
        }
        this.usersRepository.merge(user, CreateUserDto);
        return await this.usersRepository.save(user);
    }

    async findByEmail( email:  string  ): Promise<User> {
        let user = await this.usersRepository.findOne({where: {email}}) ; 
        return user ; 
    }


    async getMessagesByUserId(user_id:number): Promise<UsersToMessage[]> {
        let result =  await this.usersToMessageRepository.find({
            where :{
                user: {
                    user_id , 
                }, 
            } , 
            relations:{
               user:  true , 
               message:  true , 
            }
        }); 
        return result ; 
    }

}
