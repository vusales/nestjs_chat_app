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
        let data = this.usersRepository.find() ; 
        return  data ; 
    }

    getUser( userId: number ):  Promise< User|null > {
        let data = this.usersRepository.findOneBy({ userId }) ; 
        return data ;
    }

    async createUser( CreateUserDto: CreateUserDto ): Promise<User>{
        const user = this.usersRepository.create(CreateUserDto);
        const result = await this.usersRepository.save(user); 
        return result ;
    }

    async updateUser(userId: number , CreateUserDto: CreateUserDto   ): Promise<User> {
        const user = await this.usersRepository.findOneBy({userId});
        if (!user) {
            throw new Error(`User with userId ${userId} not found`);
        }
        this.usersRepository.merge(user, CreateUserDto);
        return await this.usersRepository.save(user);
    }

    findByEmail( email:  string  ): Promise<User> {
        let user =  this.usersRepository.findOne({where: {email}}) ; 
        return user ; 
    }
}
