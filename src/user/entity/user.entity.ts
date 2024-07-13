import { 
    Column, 
    Entity,  
    OneToMany,  
    PrimaryGeneratedColumn 
} from "typeorm";

import { UsersToMessage } from "./usersToMessage.entity";

@Entity() 
export class User {

    @PrimaryGeneratedColumn() 
    user_id: number ; 

    @Column()
    name:  string ; 

    @Column()
    lastName:  string ; 

    @Column()
    email: string ; 

    @Column()
    phone: string ; 

    @Column() 
    password: string ; 

    @Column({
        nullable:  true , 
        type: 'simple-array',
    })
    
    connectedUsers!: number[]  ; 


    @OneToMany(() => UsersToMessage, usersToMessage => usersToMessage.user)
    usersToMessage: UsersToMessage ; 

}