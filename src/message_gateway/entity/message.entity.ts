import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { UsersToMessage } from "src/user/entity/usersToMessage.entity";


@Entity() 
export class Message {
    @PrimaryGeneratedColumn()
    message_id: number ;

    @Column()
    sender_id: number ; 


    @Column()
    receiver_id: number ; 


    @Column()
    message_text: string ; 


    @CreateDateColumn({ 
        type: 'timestamp', 
        // default: () => 'CURRENT_TIMESTAMP'
    })
    sent_time: Date ; 


    @CreateDateColumn({ 
        type: 'timestamp', 
        // default: () => 'CURRENT_TIMESTAMP'
    })
    read_time: Date ; 


    @OneToMany(() => UsersToMessage, usersToMessage => usersToMessage.message)
    usersToMessage: UsersToMessage ; 
}