import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Booking } from "./Booking"
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

    @Column({
        default: 0
    })
    isActive: boolean

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedule: Schedule[]

    @OneToMany(() => Booking, booking => booking.user)
    booking: Booking[]

    token: string;
}
