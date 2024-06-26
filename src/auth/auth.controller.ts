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
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login( @Body()  body: LoginDto ) {
        return this.authService.validateUser(body); 
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile() {
        return "this is data that is visible only  when user loged in "
    }
}
