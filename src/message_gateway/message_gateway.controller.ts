import { 
    Controller, 
    Get , 
    Param, 
    Post , 
    Headers , 
} from '@nestjs/common';
import { MessageGatewayService } from './message_gateway.service';


@Controller('messages')
export class MessageGatewayController {

    constructor(
        private messageService : MessageGatewayService , 
    ) {}

    @Get(":/userId")
    getUserMessages(
        @Param() params: { userId: string|number } , 
        @Headers() headers: { authorization: string } , 
    ){
        return headers ;  
    }


}
