import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    hourFrom: string

    @Column({
        nullable: true
    })
    hourTo: string

    @Column({
        nullable: true
    })
    day: string
    
    @Column({
        default: 0
    })
    isBooked: boolean

    @Column({
        nullable: true
    })
    dayTo: string

    @Column({
        nullable: true
    })
    dayFrom: string

    @ManyToOne(()=> User, user => user.schedule)
    user: User
}
