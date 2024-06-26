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

    getUser( id: number ):  Promise< User|null > {
        let data = this.usersRepository.findOneBy({ id }) ; 
        return data ;
    }

    async createUser( CreateUserDto: CreateUserDto ): Promise<User>{
        const user = this.usersRepository.create(CreateUserDto);
        const result = await this.usersRepository.save(user); 
        return result ;
    }


}
