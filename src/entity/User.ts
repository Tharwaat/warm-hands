import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Schedule } from "./Schedule"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    firstName: string

    @Column({
        nullable: true
    })
    lastName: string

    @Column({
        nullable: true
    })
    age: number

    @Column({
        nullable: true
    })
    email: string

    @Column({
        nullable: true,
        unique: true
    })
    phoneNumber: string

    @Column()
    password: string

    @Column({
        nullable: true
    })
    type: string

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedule: Schedule[]
}
