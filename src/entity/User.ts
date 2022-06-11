import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
    salt: string
}
