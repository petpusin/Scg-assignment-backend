import { ApiProperty } from "@nestjs/swagger";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity('groups')
export class Group {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        type: 'varchar'
    })
    name: string

    @ApiProperty()
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date

    @ApiProperty()
    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    lastChangedDateTime: Date


    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Contact, (contact) => contact.group)
    contact: Contact[]
}