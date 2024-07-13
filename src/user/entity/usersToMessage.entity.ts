import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Message } from "src/message_gateway/entity/Message.entity";


@Entity()
export class UsersToMessage {

    @PrimaryGeneratedColumn()
    id: number ; 

    @ManyToOne(() => User, user => user.usersToMessage)
    user: User;

    @ManyToOne(() => Message, message => message.usersToMessage)
    message: Message;
}