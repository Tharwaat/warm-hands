import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Schedule } from "./Schedule"
import { User } from "./User"

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, user => user.schedule)
    user: User

    @OneToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule
}
