import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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
        default: () => 'CURRENT_TIMESTAMP'
    })
    sent_time: Date ; 


    @CreateDateColumn({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    read_time: Date ; 
}