import { 
    Post ,  
    Get , 
    Body, 
    Controller, 
    HttpCode,
    HttpStatus , 
    UseGuards , 
} from '@nestjs/common';
import { LoginDto } from './dto/LoginDto.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/CreateUserDto.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}


    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login( @Body()  body: LoginDto ) {
        return this.authService.login(body); 
    }


    @HttpCode(HttpStatus.OK)
    @Post("/signIn")
    async signIn( @Body()  body: CreateUserDto ) {
        return this.authService.signIn(body); 
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile() {
        return "this is data that is visible only  when user loged in "
    }


}
