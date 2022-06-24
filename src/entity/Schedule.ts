import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    hourFrom: string

    @Column()
    hourTo: string

    @ManyToOne(()=> User, user => user.schedule, {
        eager: true
    })
    user: User

    @Column()
    day: string
}
