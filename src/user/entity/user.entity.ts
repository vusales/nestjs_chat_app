import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class User {

    @PrimaryGeneratedColumn() 
    id: number ; 

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

}