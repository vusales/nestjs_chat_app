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
import { Public } from 'src/decorators/setRoutePublic';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService , 
    ){}


    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("/login")
    async login( @Body()  body: LoginDto ) {
        return this.authService.login(body); 
    }


    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("/signIn")
    async signIn( @Body()  body: CreateUserDto ) {
        return this.authService.signIn(body); 
    }


    @Get("/profile")
    getProfile() {
        return "this is data that is visible only  when user loged in "
    }

}
