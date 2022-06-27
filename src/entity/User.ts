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

    @Column({
        nullable: true
    })
    fees: number

    @Column({
        nullable: true
    })
    country: string

    @Column({
        nullable: true
    })
    experience: string

    @Column({
        nullable: true
    })
    illnessCase: string

    @Column({
        nullable: true
    })
    gender: string

    @OneToMany(() => Schedule, schedule => schedule.user,
        {
            eager: true
        }
    )
    schedule: Schedule[]

    @OneToMany(() => Booking, booking => booking.user,
        {
            eager: true
        }
    )
    booking: Booking[]

    token: string;
}
