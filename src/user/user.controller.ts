import { 
    Controller, 
    Get , 
    Param ,
    Post, 
    Body , 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto.dto';

@Controller('user')
export class UserController {
    constructor( private UserService: UserService ) {}

    @Get() 
    getUsers () {
        return this.UserService.getUsers(); 
    }

    @Get("/:userId") 
    getUser (@Param()  params: {userId: number } ) {
        return this.UserService.getUser(params.userId) ; 
    }

    @Post("/create") 
    createUser( @Body() CreateUserDto: CreateUserDto ) {
        return this.UserService.createUser(CreateUserDto) ; 
    }

    @Post("/update/:userId")
    updateUser(@Param() params: {userId: number} ,  @Body() CreateUserDto: CreateUserDto ){
        return this.UserService.updateUser( params.userId , CreateUserDto ); 
    }

}
